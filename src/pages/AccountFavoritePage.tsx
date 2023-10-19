import Empty from "../components/Empty/Empty"

interface Props {
  className?: string
}

export default function AccountFavoritePage({ className }: Props) {
  return (
    <div className={className}>
      <h1 className="text-5xl font-bold mb-6">Featured Products</h1>
      <section>
        <Empty type="favorite" />
      </section>
    </div>
  )
}
