import Link from "next/link";

type ProjectCardProps = {
  description: string;
  icon: string;
  isInternal?: boolean;
  link: string;
  title: string;
};

export default function ProjectCard({
  description,
  icon,
  isInternal = false,
  link,
  title,
}: ProjectCardProps) {
  const CardContent = () => (
    <div className="brutal-card p-4 hover:bg-gray-900 dark:hover:bg-gray-800 transition-colors">
      <div className="flex items-start gap-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <h4 className="font-bold">{title}</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );

  if (isInternal) {
    return <CardContent />;
  }

  return (
    <Link href={link} rel="noopener noreferrer" target="_blank">
      <CardContent />
    </Link>
  );
}
