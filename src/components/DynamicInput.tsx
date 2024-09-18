import React, { useState, KeyboardEvent, ChangeEvent } from "react";

interface Tag {
  id: number;
  name: string;
}

const initialTags: Tag[] = [
  { id: 1, name: "React" },
  { id: 2, name: "Next.js" },
  { id: 3, name: "Tailwind" },
  { id: 4, name: "JavaScript" },
  { id: 5, name: "CSS" },
];

export const DynamicInput: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !inputValue) {
      setTags((prevTags) => prevTags.slice(0, -1));
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleTagClick = (tag: Tag) => {
    setTags((prevTags) => [...prevTags, tag]);
    // Reset input value to mimic insertion at cursor position
    setInputValue("");
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 p-2 border border-gray-300">
        {tags.map((tag) => (
          <span key={tag.id} className="flex items-center gap-2 bg-blue-100 px-2 py-1 rounded-full">
            {tag.name}
            <button
              className="text-sm text-gray-500"
              onClick={() => setTags((prevTags) => prevTags.filter((t) => t.id !== tag.id))}
            >
              &times;
            </button>
          </span>
        ))}
        <input type="text" value={inputValue} onChange={handleChange} onKeyDown={handleKeyDown} className="flex-1" />
      </div>
      <div className="flex flex-col mt-4">
        {initialTags.map((tag) => (
          <button key={tag.id} onClick={() => handleTagClick(tag)} className="mt-1 text-left">
            {tag.name}
          </button>
        ))}
      </div>
    </div>
  );
};
