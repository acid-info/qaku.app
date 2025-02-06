pipeline {
  agent { label 'linux' }

  parameters {
    string(
      name: 'IMAGE_TAG',
      defaultValue: params.IMAGE_TAG ?: '',
      description: 'Optional Docker image tag to push.'
    )
  }

  options {
    disableConcurrentBuilds()
    /* manage how many builds we keep */
    buildDiscarder(logRotator(
      numToKeepStr: '20',
      daysToKeepStr: '30',
    ))
  }

  environment {
    IMAGE_NAME = ''
    NEXT_PUBLIC_SITE_URL = "https://${env.JOB_BASE_NAME}"
  }

  stages {
    stage('Build') {
      steps {
        script {
          withCredentials([
            string(
              credentialsId: 'acid-info-github-token',
              variable: 'NEXT_GITHUB_PERSONAL_ACCESS_TOKEN'
            ),
          ]) {
            image = docker.build(
              "${IMAGE_NAME}:${GIT_COMMIT.take(8)}",
              ["--build-arg='NEXT_GITHUB_PERSONAL_ACCESS_TOKEN=${NEXT_GITHUB_PERSONAL_ACCESS_TOKEN}'",
               "."].join(' ')
            )
          }
        }
      }
    }

    stage('Push') {
      steps { script {
        withDockerRegistry([credentialsId: 'dockerhub-statusteam-auto', url: '']) {
          image.push()
        }
      } }
    }

    stage('Deploy') {
      when { expression { params.IMAGE_TAG != '' } }
      steps { script {
        withDockerRegistry([credentialsId: 'dockerhub-statusteam-auto', url: '']) {
          image.push(params.IMAGE_TAG)
        }
      } }
    }
  }

  post {
    cleanup { cleanWs() }
  }
}
