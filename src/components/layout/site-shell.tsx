import { PreferenceDock } from "@/components/layout/preference-dock";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <PreferenceDock />
      {/* El header flota sobre el contenido, así que el main reserva su alto.
          El hero lo cancela con un margen negativo para quedar por debajo. */}
      <main className="flex-1 pt-(--header-height)">{children}</main>
      <SiteFooter />
    </div>
  );
}
