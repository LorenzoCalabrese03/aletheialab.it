import CodingInProgress from "@/components/CodingInPrograss/CodingInProgress";
import Hero from "@/components/HomePage/Hero";
import About from "@/components/HomePage/About";
import Organigramma from "@/components/HomePage/Organigramma";

export default function HomePage(){
  return(
      <>
        {/*Hero section*/}
          <section>
            <Hero/>
          </section>

        {/*About section*/}
          <section>
            {/*<About/>*/}
          </section>

        {/*Organigramma*/}
          <section>
            {/*<Organigramma/>*/}
          </section>

        {/*Service section*/}
          <section>

          </section>

        {/*Feature Projects*/}
          <section>

          </section>

        {/*Calendar section*/}
          <section>

          </section>

        {/*Team Highlights*/}
          <section>

          </section>

        {/*Referenze*/}
          <section>

          </section>

        {/*Events*/}
          <section>

          </section>

        {/*Awards*/}
          <section>

          </section>

          {/**/}
        <CodingInProgress/>
      </>

  );
}