import type { Game } from "@/lib/gamesData";

const API_BASE_URL = "/api";

export async function fetchGames(): Promise<Game[]> {
  const response = await fetch(`${API_BASE_URL}/games`);

  if (!response.ok) {
    throw new Error("Failed to fetch games.");
  }

  return response.json();
}