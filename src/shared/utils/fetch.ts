/**
 * Мок функция fetch.
 */
export async function fetchData(): Promise<unknown> {
  try {
    const response = await fetch("/data/fileList.json");
    if (!response.ok) throw new Error("Failed to fetch");
    return await response.json();
  } catch (error) {
    console.error("Error loading mock data:", error);
    throw error;
  }
}
