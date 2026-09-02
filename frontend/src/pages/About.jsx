import { Link } from "react-router-dom";
import ArrowRight from "../components/ArrowRight";
import aboutImg from "../assets/about-img.png";
import { HiOutlineArrowDownTray } from "react-icons/hi2";

const About = () => {
  return (
    <main className="px-6 md:px-12 lg:px-18 py-24 pt-32 h-full">
      <section className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-[500px_1fr] lg:items-center">
          {/* Image */}
          <div className="overflow-hidden border border-(--border)">
            <img
              src={aboutImg}
              alt="Saurav Vishwakarma"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Bio */}
          <div>
            <p className="mb-4 text-label font-medium uppercase tracking-[0.3em] text-(--primary-cta)">
              About Me
            </p>

            <div className="mt-8 max-w-2xl space-y-6 text-body font-normal text-(--muted-text)">
              <p>
                I'm Saurav Vishwakarma, a <strong>Graphic Designer</strong> and <strong>Illustrator</strong>, originally from Dhanbad, Jharkhand, currently living in New Delhi. I did my BFA in Applied Art from Jamia Millia Islamia.
              </p>
              <p>
                I use software like <strong><em>Adobe Photoshop, Adobe Illustrator, Adobe InDesign, and Adobe Fresco</em></strong> the most, <strong><em>Lightroom</em></strong> for photo editing, and have a basic knowledge of <strong><em>Figma</em></strong>.
              </p>
              <p>
                I have a proclivity towards book cover design, illustrations, and drawing.I translate stories, ideas and emotions into visual imagery through illustration, drawing, sketching, typography, composition and imagery etc. I constantly seek inspiration to enhance my creativity by reading books, articles, surfing the internet, so on and so forth.
              </p>
              <p>
                When I'm not working, you can usually find me wandering around a bookstore, immersing myself in books, movie scripts, and indulging in drawing and sketching, allowing myself to be transcended to another realm. I consider myself a lifelong learner, student, and nobody.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-xl bg-(--primary-cta) px-7 py-3 font-medium text-white transition-all duration-300"
              >
                Let's Talk
                <ArrowRight
                  size={18}
                  className="transition-all duration-300 group-hover:translate-x-2"
                />
              </Link>

              <a
                href="/Saurav-Vishwakarma-CV.pdf"
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
