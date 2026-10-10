export default function PageHeader({ title, children }) {
  return (
    <div className="text-center">
      <h2 className="mt-[1.2rem] mb-16 text-[1.4rem] leading-[1.2] font-medium text-heading">{title}</h2>
      {children}
    </div>
  )
}
