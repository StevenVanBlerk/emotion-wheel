const IntrospectiveQuestions = () => {
  return (
    <div>
      <div className="mt-8 grid grid-cols-[80%_20%]">
        <label className="grid">
          Why am I feeling this way? 🕒 (2 min) <TextArea />
        </label>

        <button className="ml-8 rounded border-2 bg-gray-500">
          I&apos;m ready to move on
        </button>
      </div>
      <div className="mt-8 grid grid-cols-[80%_20%]">
        <label className="grid">
          What would I say to a friend feeling this way? 🕒 (2 min)
          <TextArea />
        </label>
        <button className="ml-8 rounded border-2 bg-gray-500">
          I&apos;m ready to move on
        </button>
      </div>
      <div className="mt-8 grid grid-cols-[80%_20%]">
        <label className="grid">
          What can I do with this feeling? 🕒 (2 min)
          <TextArea />
        </label>
        <button className="ml-8 rounded border-2 bg-gray-500">
          I&apos;m ready to move on
        </button>
      </div>
      <div className="mt-8 grid grid-cols-[80%_20%]">
        <label className="grid">
          Do I need help with this? 🕒 (2 min)
          <TextArea />
        </label>
        <button className="ml-8 rounded border-2 bg-gray-500">
          I&apos;m ready to move on
        </button>
      </div>
      <div className="mt-8 grid grid-cols-[80%_20%]">
        <label className="grid">
          Who can help me with this? 🕒 (2 min)
          <TextArea />
        </label>
        <button className="ml-8 rounded border-2 bg-gray-500">
          I&apos;m ready to move on
        </button>
      </div>
    </div>
  );
};

export default IntrospectiveQuestions;

const TextArea = () => <textarea className="p-1 text-sm text-black" rows={4} />;
