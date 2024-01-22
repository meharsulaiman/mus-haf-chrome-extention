import { useRef, useState } from 'react';
import { useEffect } from 'react';
import Timer from './Timer';

function App() {
  const [image, setImage] = useState();
  const [verse, setVerse] = useState();
  const scrollableDivRef = useRef();

  useEffect(() => {
    async function getData() {
      try {
        const imageResponse = await fetch(
          'https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=masjid'
        );
        const imageJSON = await imageResponse.json();
        console.log(imageJSON.urls);
        setImage(imageJSON.urls.regular);

        const randomVerse = Math.ceil(Math.random() * 6236);

        const verseResponse = await fetch(
          `http://api.alquran.cloud/v1/ayah/${randomVerse}/editions/quran-uthmani,en.pickthall`
        );

        const verseJSON = await verseResponse.json();
        console.log(verseJSON.data);

        setVerse(verseJSON.data);
      } catch (error) {
        console.log(error);
      }
    }

    getData();
  }, []);

  if (!verse || !image) {
    return <div className='backdrop-blur-md bg-black h-screen w-screen'></div>;
  }

  const backgroundImage = image ? `url(${image})` : '';

  const scrollToBottom = () => {
    const scrollableDiv = scrollableDivRef.current;
    scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
  };

  const scrollToTop = () => {
    const scrollableDiv = scrollableDivRef.current;
    scrollableDiv.scrollTop = 0;
  };

  return (
    <>
      <div
        className='h-screen w-screen flex items-start justify-center pt-64'
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0) 35%, rgba(0, 0, 0, 0) 80%, rgba(0, 0, 0, 0.6) 100%) center center / cover no-repeat fixed, ${backgroundImage}`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className='max-w-3xl w-[700px] bg-gray-800 hover:bg-gray-900 shadow-md backdrop-blur-sm rounded-md px-4 pt-6 text-white text-center transition'>
          <Timer />
          <div
            ref={scrollableDivRef}
            className='flex flex-col gap-y-4 max-h-40 scroll-smooth overflow-y-auto no-scrollbar py-2 transition'
            onMouseOver={scrollToBottom}
            onMouseOut={scrollToTop}
          >
            <h1 className='text-4xl arabic-font font-semibold'>
              {verse[0].text}
            </h1>
            <h1 className='text-2xl'>{verse[1].text}</h1>
          </div>

          <div className='flex items-center justify-between text-lg text-neutral-300 px-4 py-2'>
            <p>
              <span className='arabic-font font-semibold'>آية</span> :
              <span>{verse[0].numberInSurah}</span>
            </p>
            <p>
              <span className='arabic-font font-semibold'>
                {verse[0].surah.name}
              </span>
              :<span>{verse[1].surah.number}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
