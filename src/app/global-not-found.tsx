import { LocalNotFound } from "@/components/not-found";
import "./globals.css";
export const metadata = {
  title: "Page not found · FairSwap",
  robots: { index: false, follow: false },
};
export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <main>
          <LocalNotFound />
        </main>
      </body>
    </html>
  );
}
