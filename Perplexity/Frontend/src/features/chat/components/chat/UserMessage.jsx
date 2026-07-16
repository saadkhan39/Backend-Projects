const UserMessage = ({ content }) => {
  return (
    <div className="flex justify-end">
      <div className="max-w-3xl rounded-3xl bg-blue-600 px-5 py-1.5 text-white shadow-md">
        <p className="whitespace-pre-wrap break-words leading-7">
          {content}
        </p>
      </div>
    </div>
  );
};

export default UserMessage;