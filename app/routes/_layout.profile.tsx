import { Link } from "react-router";
import { mockConfig } from "~/config/mock-config";

export const handle = {
  navTargetSectionId: "profile-section",
  navOffset: -200,
};

export default function ProfileRoute() {
  return (
    <main className="w-full h-fit">
      <section
        id={handle.navTargetSectionId}
        className="h-fit flex flex-col justify-center gap-10 px-5 pt-40 pb-10 md:flex-row md:gap-0 md:justify-between w-full md:h-dvh"
      >
        <div className="flex flex-col gap-10">
          <h1 className="text-[40px] font-medium uppercase tracking-tighter md:text-[56px]">
            Profile
          </h1>

          <div className="flex flex-col lg:flex-row lg:gap-16">
            {/* Info */}
            <div className="flex flex-col gap-3">
              <h2 className="flex gap-2.5">
                <span className="font-medium">
                  {mockConfig.profileData.name}.
                </span>
                <span className="text-[#a6a6a6]">
                  {mockConfig.profileData.role}
                </span>
              </h2>
              <p className="font-medium">{mockConfig.profileData.info}</p>
            </div>

            {/* Social + Contact */}
            <div className="flex flex-col gap-10">
              <div>
                <h3 className="uppercase text-[#a6a6a6]">Email & Phone</h3>
                <div className="font-medium">
                  <Link
                    to={`mailto:${mockConfig.profileData.contact.email}`}
                    className="hover-text-muted-foreground"
                  >
                    {mockConfig.profileData.contact.email}
                  </Link>
                  <p className="hover-text-muted-foreground">
                    {mockConfig.profileData.contact.phone}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="uppercase text-[#a6a6a6]">Socials</h3>
                <div className="flex flex-col font-medium">
                  {mockConfig.profileData.social.map(({ href, label }) => (
                    <Link to={href} className="hover-text-muted-foreground">
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Image */}
        <div className="md:h-1/2 md:w-xl md:ml-8 lg:h-2/3">
          <img
            src={mockConfig.profileData.image}
            alt={mockConfig.profileData.name}
            className="w-full h-full object-cover"
          />
        </div>
      </section>
    </main>
  );
}
