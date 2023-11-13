function Button({children, className, onClick, disabled,content,type }) {
  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
      content={content}
      type={type}
    >
      {children}
    </button>
  )
}

export default Button
