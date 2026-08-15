

export abstract class ApiService {
  // protected baseUrl: string;

  // constructor(baseUrl: string) {
  //   this.baseUrl = baseUrl;
  // }

  protected async get<T>(endpoint: string): Promise<T> {
    try {
      const res = await fetch(`${endpoint}`);
      this.okCheck(res);

      const data: T = await res.json();
      return data;
    } catch (error) {
      /*NOTE If the error was manually thrown by okCheck() it means the server responded,
      but it sent back a bad code (like 404 or 500).*/
      if (error instanceof Error && error.message.includes("API Error")) {
        // Pass that specific server error up to the UI.
        throw error;
      }
      /* NOTE FALLBACK: If we get here, fetch() crashed before okCheck() could even run.
      This is almost always due to a browser-level connectivity issue like lost Wi-Fi/connection,
      offline mode, CORS blockage, or DNS failure.*/
      throw new Error("Network connection lost. Please check your internet connection.");
    }
  }

  private okCheck(res: Response): Response {
    if (!res.ok) {
      throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }
    return res;
  }
}