import { FC, useState, KeyboardEvent, ChangeEvent } from "react";

interface Tag {
  id: string;
  name: string;
}

export const DynamicInput: FC = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [initialTags, setInitialTags] = useState<Tag[]>([
    { id: "awfesedawfd", name: "React" },
    { id: "fewafsdwfsd", name: "TypeScript" },
    { id: "bfdxtgfgfgg", name: "JavaScript" },
    { id: "aergdfvdffg", name: "HTML" },
    { id: "ujtnhdrfxxa", name: "CSS" },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !inputValue && tags.length) {
      setTags((prevTags) => prevTags.slice(0, -1));

      setInitialTags((prevTags) => [...prevTags, tags[tags.length - 1]]);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setInputValue(event.target.value);
  };

  const handleTagClick = (tag: Tag) => {
    if (tags.some((t) => t.id === tag.id)) return;

    setInitialTags((prevTags) => prevTags.filter((t) => t.id !== tag.id));
    setTags((prevTags) => [...prevTags, tag]);
    setInputValue("");
  };

  const handleDeleteTag = (tag: Tag) => {
    setTags((prevTags) => prevTags.filter((t) => t.id !== tag.id));
    setInitialTags((prevTags) => [...prevTags, tag]);
  };

  return (
    <div>
      <h1 className="pb-5">Dynamic Input Component</h1>
      <div className="flex flex-wrap gap-2 p-2 border border-gray-300">
        {tags.map((tag) => (
          <span key={tag.id} className="flex items-center gap-2 bg-blue-500 text-white px-2 py-1 rounded-full">
            {tag.name}
            <button
              className="flex justify-center items-center text-sm p-2 rounded-full bg-blue-700 hover:bg-blue-900 text-white"
              onClick={() => handleDeleteTag(tag)}
            >
              <span className="absolute">&times;</span>
            </button>
          </span>
        ))}
        <input type="text" value={inputValue} onChange={handleChange} onKeyDown={handleKeyDown} className="flex-1" />
      </div>
      <div className="flex flex-col items-start mt-4 space-y-2">
        {initialTags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => handleTagClick(tag)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            {tag.name}
          </button>
        ))}
      </div>
    </div>
  );
};
