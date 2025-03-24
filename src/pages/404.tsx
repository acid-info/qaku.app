import { HOME } from '@/data/routes'
import styled from '@emotion/styled'
import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <Container>
      <h1>404</h1>
      <p>Page not found</p>
      <br />
      <Link href={HOME}>Go back to home</Link>
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  a {
    text-decoration: underline;
  }
`
