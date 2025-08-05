export const Header = ({ username, hidden }: { username: string; hidden: boolean }) => {
  return (
    <div hidden={hidden} className="bg-gray-700 px-5 py-4 w-full rounded-tr-xl shadow-lg shadow-gray-800">
      <h1 className="font-semibold text-white">{username}</h1>
    </div>
  )
}
