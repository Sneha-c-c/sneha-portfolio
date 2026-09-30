import {
  Clapperboard,
  Landmark,
  Languages,
  LayoutTemplate,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { ProjectIcon } from "@/types";

export const projectIcons: Record<ProjectIcon, LucideIcon> = {
  layout: LayoutTemplate,
  languages: Languages,
  clapperboard: Clapperboard,
  users: Users,
  landmark: Landmark,
};
