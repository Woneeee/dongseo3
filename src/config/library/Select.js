export const Chart_Select = {
  container: (provided) => ({
    ...provided,
    minWidth: "200px",
  }),

  control: (provided, state) => ({
    ...provided,
    background: "linear-gradient(135deg, #e6e9f0 50%, #ffffff 100%)",
    border: "1px solid transparent",
    boxShadow: "3px 3px 5px #b8b8b8",
    borderRadius: "20px",
    borderColor: state.isFocused || state.isMenuOpen ? "var(--purple-color) !important" : "transparent",
    cursor: "pointer",
    fontSize: "0.875rem",
    padding: "1px 20px",
    maxHight: "40px",
    height: "100%",

    "&:hover": {
      borderColor: "var(--purple-color)",
    },
  }),

  hlgwow: (provided) => ({
    ...provided,
  }),

  menu: (provided) => ({
    ...provided,
    zIndex: 9999,

    background: "linear-gradient(135deg, #93a5cf 0%, #e4efe9 200%)",
    borderRadius: "20px",
    margin: "10px 0",
    padding: "10px 0",
    boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.3), 0 4px 11px rgba(0, 0, 0, 0.3)",
  }),

  singleValue: (provided) => ({
    ...provided,
    color: "#333",
  }),

  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "var(--purple-color)" : "transparent",
    color: state.isSelected || "var(--white-color)",
    cursor: "pointer",
    fontSize: "0.875rem",
    padding: "8px 20px",
    transition: "0.2s",
    "&:hover": {
      backgroundColor: "var(--purple-color-1)",
      color: "var(--white-color)",
    },
  }),

  placeholder: (provided) => ({
    ...provided,
    color: "#999",
  }),

  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: state.isFocused || state.isMenuOpen ? "var(--purple-color)" : "var(--gray-color)",
    "&:hover": {
      color: "var(--purple-color)",
    },
    padding: "8px 0 8px 8px !important",
  }),

  clearIndicator: (provided, state) => ({
    ...provided,
    color: state.isFocused || state.isMenuOpen ? "var(--purple-color)" : "var(--gray-color)",
    "&:hover": {
      color: "var(--purple-color)",
    },
  }),
};

export const Date_Select = {
  container: (provided) => ({
    ...provided,
    // maxWidth: "300px",
    minWidth: "240px",
  }),

  control: (provided, state) => ({
    ...provided,
    background: "linear-gradient(135deg, #e6e9f0 50%, #ffffff 100%)",
    // border: "1px solid transparent",
    boxShadow: "3px 3px 5px #b8b8b8",
    borderRadius: "5px",
    borderColor: state.isFocused || state.isMenuOpen ? "var(--blue-color) !important" : "transparent",
    cursor: "pointer",
    fontSize: "0.875rem",
    padding: "0 20px",
    mimHight: "auto",
    height: "100%",
    margin: "0",

    "&:hover": {
      borderColor: "var(--blue-color)",
    },
  }),

  hlgwow: (provided) => ({
    ...provided,
  }),

  menu: (provided) => ({
    ...provided,
    zIndex: 9999,
    background: "linear-gradient(135deg, #e6e9f0 50%, #ffffff 100%)",
    borderRadius: "5px",
    margin: "10px 0",
    padding: " 0",
    boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.3), 0 4px 11px rgba(0, 0, 0, 0.3)",
  }),

  singleValue: (provided) => ({
    ...provided,
    color: "#333",
  }),

  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "var(--blue-color)" : "transparent",
    color: state.isSelected ? "var(--white-color)" : "var(--gray-color-3)",
    cursor: "pointer",
    fontSize: "0.875rem",
    padding: "10px 20px",
    transition: "0.2s",
    "&:hover": {
      backgroundColor: "var(--pastel-blue)",
      color: "var(--white-color)",
    },
  }),

  placeholder: (provided) => ({
    ...provided,
    color: "#333",
  }),

  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: state.isFocused || state.isMenuOpen ? "var(--purple-color)" : "var(--gray-color)",
    "&:hover": {
      color: "var(--purple-color)",
    },
    padding: "8px 0 8px 8px !important",
  }),

  clearIndicator: (provided, state) => ({
    ...provided,
    color: state.isFocused || state.isMenuOpen ? "var(--purple-color)" : "var(--gray-color)",
    "&:hover": {
      color: "var(--purple-color)",
    },
  }),
};
