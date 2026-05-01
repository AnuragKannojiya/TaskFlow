import { Link } from "react-router-dom";

const AuthForm = ({
  title,
  subtitle,
  fields,
  formData,
  setFormData,
  onSubmit,
  submitLabel,
  error,
  footerText,
  footerLink,
  footerLinkText
}) => {
  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/70 sm:p-8">
        <div className="mb-8">
          <Link to="/" className="text-sm font-semibold uppercase text-brand">
            TaskFlow
          </Link>
          <h1 className="mt-2 text-3xl font-bold text-ink">{title}</h1>
          <p className="mt-2 leading-6 text-slate-500">{subtitle}</p>
        </div>

        {error ? (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        ) : null}

        <form onSubmit={onSubmit} className="space-y-4">
          {fields.map((field) => (
            <label key={field.name} className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">{field.label}</span>
              <input
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 outline-none transition placeholder:text-slate-400 focus:border-brand focus:ring-2 focus:ring-blue-100"
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required
              />
            </label>
          ))}
          <button
            type="submit"
            className="w-full rounded-md bg-brand px-4 py-2.5 font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
          >
            {submitLabel}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          {footerText}{" "}
          <Link className="font-semibold text-brand hover:text-blue-700" to={footerLink}>
            {footerLinkText}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
