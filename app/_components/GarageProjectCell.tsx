import Link from "next/link";
import PixelAgentLogo from "@/app/pixelagent/_components/PixelAgentLogo";

export type GarageProject = {
  slug: string;
  num: string;
  type: string;
  name: string;
  desc: string;
  tags: string[];
  wip?: boolean;
};

export default function GarageProjectCell({
  project,
}: {
  project: GarageProject;
}) {
  const body = (
    <>
      <span className="garage-kicker">
        {project.num} {project.type}
      </span>

      <div className="garage-title-row">
        {project.slug === "pixelagent" && (
          <PixelAgentLogo size={26} className="garage-title-mark" />
        )}
        <h2 className="garage-title">{project.name}</h2>
        {project.wip && (
          <span className="wip-chip">
            <span className="wip-dot" aria-hidden="true" />
            WIP
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
          →
        </span>
      </div>
    </>
  );

  return (
    <Link
      href={`/${project.slug}`}
      className="garage-cell garage-cell--active"
    >
      {body}
    </Link>
  );
}
