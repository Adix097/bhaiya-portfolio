import { Link } from "react-router-dom";
import ArrowRight from "../components/ArrowRight";
import photo from "../assets/about-photo.jpeg";
import { HiOutlineArrowDownTray } from "react-icons/hi2";

const About = () => {
  return (
    <main className="px-6 md:px-12 lg:px-18 py-24 pt-32 h-full">
      <section className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-[500px_1fr] lg:items-center">
          {/* Image */}
          <div className="overflow-hidden border border-(--border)">
            <img
              src={photo}
              alt="Saurav Vishwakarma"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Bio */}
          <div>
            <p className="mb-4 text-label font-medium uppercase tracking-[0.3em] text-(--primary-cta)">
              About Me
            </p>

            <h1 className="text-hero font-bold leading-tight text-(--hero-text)">
              Designer first,
              <br />
              storyteller always.
            </h1>

            <div className="mt-8 max-w-2xl space-y-6 text-body font-normal text-(--muted-text)">
              <p>
                I'm Saurav Vishwakarma, a graphic designer focused on brand
                identity, visual systems, and illustration. I enjoy creating
                work that feels clear, memorable, and built with purpose.
              </p>

              <p>
                My process combines strategy and aesthetics. Whether I'm
                designing a logo, developing a visual identity, or creating
                illustrations, I aim to make every element communicate something
                meaningful.
              </p>

              <p>
                When I'm not designing, I'm exploring typography, sketching new
                ideas, and studying how great visual identities shape the way
                people connect with brands.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-xl bg-(--primary-cta) px-7 py-3 font-medium font-cta text-white transition-all duration-300"
              >
                Let's Talk
                <ArrowRight
                  size={18}
                  className="transition-all duration-300 group-hover:translate-x-2"
                />
              </Link>

              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 text-secondary font-medium text-(--muted-text) transition-colors duration-300 hover:text-(--hero-text)"
              >
                Download CV
                <HiOutlineArrowDownTray size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
