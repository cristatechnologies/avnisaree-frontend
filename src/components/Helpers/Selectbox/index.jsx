import { useState, useEffect } from "react";
import ServeLangItem from "../ServeLangItem";

export default function Selectbox({
  datas = [],
  defaultValue = "",
  className,
  action,
  children,
  dropdownId,
}) {
  const [item, setItem] = useState({ name: defaultValue });
  const [toggle, setToggle] = useState(false);
  const [searchTerms, setSearchTerms] = useState({});

  const handler = (e, value) => {
    if (action) {
      action(value);
    }
    setItem(value);
    setToggle(!toggle);
  };

  useEffect(() => {
    if (defaultValue) {
      setItem({ name: defaultValue });
    } else {
      setItem({ name: "Select" });
    }
  }, [datas, defaultValue]);

  useEffect(() => {
    setSearchTerms((prevSearchTerms) => ({
      ...prevSearchTerms,
      [dropdownId]: "",
    }));
  }, [dropdownId]);

  const handleInputChange = (e) => {
    setSearchTerms((prevSearchTerms) => ({
      ...prevSearchTerms,
      [dropdownId]: e.target.value,
    }));
  };

  const filteredDatas = datas?.filter((value) =>
    value.name.toLowerCase().includes(searchTerms[dropdownId]?.toLowerCase())
  );

  return (
    <>
      <div className={`my-select-box ${className || ""}`}>
        <button
          onClick={() => {
            // Clear other search inputs when opening a dropdown
            setSearchTerms((prevSearchTerms) => ({
              ...Object.keys(prevSearchTerms).reduce((acc, key) => {
                acc[key] = key === dropdownId ? prevSearchTerms[key] : "";
                return acc;
              }, {}),
            }));
            setToggle(!toggle);
          }}
          type="button"
          className="my-select-box-btn"
        >
          {children ? (
            children({ item: item && item.name })
          ) : (
            <span>{item && item.name}</span>
          )}
        </button>

        {toggle && (
          <>
            <div className="click-away" onClick={() => setToggle(false)}></div>

            <div className={`my-select-box-section open `}>
              {/* Search input */}
              
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerms[dropdownId]}
                  onChange={handleInputChange}
                  className="w-full p-3 border-b border-gray-400"
                />
              

              {/* Display filtered options */}
              <ul
                className={`list ${
                  filteredDatas && filteredDatas?.length > 0
                    ? "overflow-auto h-60"
                    : "h-20"
                }`}
              >
                <li className="cursor-not-allowed selected pointer-events-none">
                  {ServeLangItem()?.Select_One}
                </li>
                {filteredDatas?.length === 0 && <li>No data found</li>}
                {filteredDatas &&
                  filteredDatas?.length > 0 &&
                  filteredDatas.map((value) => (
                    <li
                      className={
                        item && item.name === value.name ? "selected" : ""
                      }
                      key={Math.random()}
                      onClick={(e) => handler(e, value)}
                    >
                      {value.name}
                    </li>
                  ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </>
  );
}
