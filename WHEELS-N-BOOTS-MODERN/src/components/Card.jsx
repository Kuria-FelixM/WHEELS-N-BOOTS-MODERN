export default function Card({ image, title, description, link, children }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
      {/* Image */}
      {image && (
        <div className="relative h-48 sm:h-56 overflow-hidden bg-gray-200">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-4 sm:p-6 flex-1 flex flex-col">
        {title && (
          <h3 className="font-zuumebold text-clamp-h5 mb-2">
            {title}
          </h3>
        )}

        {description && (
          <p className="font-lora text-clamp-p-sm text-gray-700 mb-4 flex-1">
            {description}
          </p>
        )}

        {children && <div className="mb-4">{children}</div>}

        {link && (
          <a
            href={link.href}
            className="text-dark font-zuumebold hover:text-primary transition-colors inline-flex items-center gap-2 mt-auto"
          >
            {link.label} →
          </a>
        )}
      </div>
    </div>
  )
}
