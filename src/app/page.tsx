import Button from '@/components/Button'

export default function Home() {
  return (
    <div>
       <Button outline>Hello</Button>
        <Button primary>Hello</Button>
        <Button text>Hello</Button>
        <Button disabled>Hello</Button>
        <Button large>Hello</Button>
        <Button small>Hello</Button>
        <Button href="https://www.youtube.com/">Hello</Button>
        <Button to="/login">Hello</Button>
    </div>
  )
}
