export default function BreadcrumbCom({
  paths = [{ name: "home", path: "/" }],
  isBecomeSeller,
  isMyAccountBreadCrumps,
}) {
  return (
    <>
      {paths && paths.length > 0 && (
        <div key={Math.random()} style={{ fontFamily: "Jost" }}>
          <div
            className={`"breadcrumb-wrapper font-400  ${
              isMyAccountBreadCrumps
                ? "text-[var(--text-color)]"
                : "text-[var(--secondary-color)]"
            } ${isBecomeSeller ? "" : "mb-5"}  pt-5 print:hidden"`}
            style={{ fontFamily: "Jost" }}
          >
            {paths.map((path) => (
              <span key={Math.random()}>
                <a href={path.path}>
                  <span className="mx-1 capitalize">{path.name}</span>
                </a>
                <span className="sperator"> / </span>
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
