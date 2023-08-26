import { getUserDataFromLocalStorage } from "../../../utils/getUserDataFromLocalStorage";

export default function Header() {
	return (
		<div className="bg-white h-16 px-4 flex items-center border-b border-gray-200 justify-between text-2xl">
			Hey, {getUserDataFromLocalStorage()?.user.name} 👋
		</div>
	)
}
