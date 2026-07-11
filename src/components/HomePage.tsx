import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";

// import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <main className="flex-1">
        <HeroBanner />
       
      </main>
      {/* <Footer /> */}
    </div>
  );
}
