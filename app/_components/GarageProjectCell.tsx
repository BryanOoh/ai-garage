import Link from "next/link";
import { hasPixelagentAccess } from "@/lib/pixelagent-access";

const lockIcon = (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <path
      d="M2.5 4.5V3a2.5 2.5 0 0 1 5 0v1.5M2 4.5h6a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1Z"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinejoin="round"
    />
  </svg>
);

export type GarageProject = {
  slug: string;
  num: string;
  type: string;
  name: string;
  desc: string;
  tags: string[];
  wip?: boolean;
};

export default async function GarageProjectCell({
  project,
}: {
  project: GarageProject;
}) {
  const pixelagentOpen =
    project.slug !== "pixelagent" || (await hasPixelagentAccess());
  const locked = project.slug === "pixelagent" && !pixelagentOpen;

  const body = (
    <>
      <span className="garage-kicker">
        {project.num} {project.type}
      </span>

      <div className="garage-title-row">
        <h2 className="garage-title">{project.name}</h2>
        {project.wip && (
          <span className="wip-chip">
            <span className="wip-dot" aria-hidden="true" />
            WIP
          </span>
        )}
        {locked && (
          <span className="closed-chip">
            {lockIcon}
            Page closed
          </span>
        )}
      </div>

      <p className="garage-desc">{project.desc}</p>

      <div className="garage-cell-foot">
        <div className="garage-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="garage-tag">
              {tag}
            </span>
          ))}
        </div>
        <span className="garage-arrow" aria-hidden="true">
          {locked ? "—" : "→"}
        </span>
      </div>
    </>
  );

  if (locked) {
    return (
      <div
        className="garage-cell garage-cell--active garage-cell--locked"
        aria-label={`${project.name} — page temporarily closed`}
      >
        {body}
      </div>
    );
  }

  return (
    <Link
      href={`/${project.slug}`}
      className="garage-cell garage-cell--active"
    >
      {body}
    </Link>
  );
}
