
import stage1 from "../images/stage1.png";
import stage2 from "../images/stage2.png";
import stage3 from "../images/stage3.png";
import stage4 from "../images/stage4.png";

const scenes = {
  1: {
    label: "THE STREET ENCOUNTER",
    description: "An unexpected meeting with the police.",
    environment: "CITY STREET",
    image: stage1,
  },
  2: {
    label: "THE POLICE STATION",
    description: "The officer asks you to accompany them.",
    environment: "POLICE STATION",
    image: stage2,
  },
  3: {
    label: "THE QUESTIONING ROOM",
    description: "The investigating officer begins asking questions.",
    environment: "QUESTIONING ROOM",
    image: stage3,
  },
  4: {
    label: "THE ARREST",
    description: "The officer informs you that you are under arrest.",
    environment: "POLICE CUSTODY",
    image: stage4,
  },
};

export default function SceneArtwork({ stageNumber }) {
  const scene = scenes[stageNumber] || scenes[1];

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">

      {/* Stage image */}
      <div className="relative flex h-[210px] items-center justify-center bg-muted sm:h-[250px]">
        <img
          src={scene.image}
          alt={scene.label}
          className="h-full w-full object-contain"
        />

        <span className="absolute left-4 top-4 rounded-full border border-border bg-card/90 px-3 py-1.5 text-[10px] font-bold tracking-wider text-foreground">
          {scene.environment}
        </span>

        <span className="absolute right-4 top-4 rounded-full bg-primary/10 px-3 py-1.5 text-[10px] font-bold text-primary">
          STAGE 0{stageNumber}
        </span>
      </div>

      {/* Stage information */}
      <div className="p-4 sm:p-5">
        <h3 className="text-lg font-bold text-foreground">
          {scene.label}
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">
          {scene.description}
        </p>
      </div>

    </div>
  );
}
