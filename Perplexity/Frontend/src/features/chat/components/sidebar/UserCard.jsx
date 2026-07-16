import { LogOut, User } from "lucide-react";
import { useSelector } from "react-redux";

const UserCard = ({ onLogout }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="border-t border-neutral-700 pt-4">
      <div className="flex items-center justify-between rounded-xl bg-[#171717] p-3">

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600">
            <User size={18} className="text-white" />
          </div>

          <div>
            <p className="text-sm font-semibold text-white">
              {user?.username}
            </p>

            <p className="text-xs text-neutral-400">
              {user?.email}
            </p>
          </div>
        </div>

        <button
  onClick={() => {
    console.log("Logout button clicked");
    console.log(onLogout);
    onLogout?.();
  }}
  className="rounded-lg p-2 text-neutral-400 transition hover:bg-red-500 hover:text-white"
>
  <LogOut size={18} />
</button>
      </div>
    </div>
  );
};

export default UserCard;