const IntrospectiveQuestions = () => {
  return (
    <div>
      <div className="mt-8 grid grid-cols-[80%_20%]">
        <label className="grid">
          Why am I feeling this way? 🕒 <textarea id="why-this-feeling" />
        </label>

        <button className="ml-8 rounded border-2 bg-gray-500">
          I&apos;m ready to move on
        </button>
      </div>
      <div className="mt-8 grid grid-cols-[80%_20%]">
        <label className="grid">
          What would I say to a friend feeling this way? 🕒
          <textarea />
        </label>
        <button className="ml-8 rounded border-2 bg-gray-500">
          I&apos;m ready to move on
        </button>
      </div>
      <div className="mt-8 grid grid-cols-[80%_20%]">
        <label className="grid">
          What can I do with this feeling? 🕒
          <textarea />
        </label>
        <button className="ml-8 rounded border-2 bg-gray-500">
          I&apos;m ready to move on
        </button>
      </div>
      <div className="mt-8 grid grid-cols-[80%_20%]">
        <label className="grid">
          Do I need help with this? 🕒
          <textarea />
        </label>
        <button className="ml-8 rounded border-2 bg-gray-500">
          I&apos;m ready to move on
        </button>
      </div>
      <div className="mt-8 grid grid-cols-[80%_20%]">
        <label className="grid">
          Who can help me with this? 🕒
          <textarea />
        </label>
        <button className="ml-8 rounded border-2 bg-gray-500">
          I&apos;m ready to move on
        </button>
      </div>
    </div>
  );
};

export default IntrospectiveQuestions;
