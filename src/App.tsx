import "./App.css";
import { useState } from "react";
import { check } from "@tauri-apps/plugin-updater";

function App() {
  const [message, setMessage] = useState("");
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [update, setUpdate] = useState<any>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const checkForUpdates = async () => {
    try {
      setMessage("Checking for updates...");
      setUpdateAvailable(false);

      const result = await check();

      if (result) {
        setUpdate(result);
        setUpdateAvailable(true);
        setMessage(`Update available: ${result.version}`);
      } else {
        setMessage("You are using the latest version.");
      }
    } catch (error) {
      console.error("Update check failed:", error);
      setMessage("Failed to check for updates.");
    }
  };

  const installUpdate = async () => {
    if (!update) return;

    try {
      setIsUpdating(true);
      setMessage("Downloading update...");

      await update.downloadAndInstall();

      setMessage("Update installed. Restarting...");
    } catch (error) {
      console.error("Update installation failed:", error);
      setMessage("Failed to install update.");
      setIsUpdating(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
          {/* Icon */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 ring-1 ring-blue-500/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="h-8 w-8 text-blue-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V3m0 0 4.5 4.5M12 3 7.5 7.5M4.5 12.75v4.5A2.25 2.25 0 0 0 6.75 19.5h10.5a2.25 2.25 0 0 0 2.25-2.25v-4.5"
              />
            </svg>
          </div>

          {/* Heading */}
          <div className="mt-6 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Finance Tracker
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Keep your application up to date
            </p>
          </div>

          {/* Status */}
          <div
            className={`mt-8 rounded-xl border p-4 ${
              updateAvailable
                ? "border-blue-500/20 bg-blue-500/5"
                : "border-slate-800 bg-slate-950/50"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                  updateAvailable
                    ? "bg-blue-500/10 text-blue-400"
                    : "bg-slate-800 text-slate-400"
                }`}
              >
                {updateAvailable ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6l4 2"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75"
                    />
                  </svg>
                )}
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-200">
                  {message || "Ready to check for updates"}
                </p>

                {updateAvailable && (
                  <p className="mt-1 text-xs text-slate-500">
                    A new version of Finance Tracker is available.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Action */}
          <div className="mt-6">
            {!updateAvailable && (
              <button
                onClick={checkForUpdates}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-500 active:scale-[0.98]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12a7.5 7.5 0 0 1 15 0M19.5 12l-3-3m3 3-3 3"
                  />
                </svg>
                Check for Updates
              </button>
            )}

            {updateAvailable && (
              <button
                onClick={installUpdate}
                disabled={isUpdating}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isUpdating ? (
                  <>
                    <svg
                      className="h-4 w-4 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Installing Update...
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"
                      />
                    </svg>
                    Install Update
                  </>
                )}
              </button>
            )}
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-slate-600">
            Finance Tracker Desktop
          </p>
        </div>
      </div>
    </main>
  );
}

export default App;
