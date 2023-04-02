interface DropdownProps {
  value: string;
  setValue: any;
}

const Dropdown: React.FC<DropdownProps> = (props) => {
  const handleChange = (e: { target: { value: any } }) => {
    props.setValue(e.target.value);
  };

  let displayedElement = null;

  if (props.value) {
    displayedElement = <><br /></>;
  } else {
    displayedElement = <><br /></>;
  }

  return (
    <div>
      <div className="relative w-full lg:max-w-sm">
        <select
          value={props.value}
          onChange={handleChange}
          className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
        >
          <option value="ytUrl">Youtube</option>
          <option value="audio">Audio</option>
          <option value="pdf">Pdf</option>
        </select>
      </div>

      {displayedElement}
    </div>
  );
};

export default Dropdown;
