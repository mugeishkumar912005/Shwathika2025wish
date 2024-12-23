from flask import Flask, send_file
from gtts import gTTS
from pydub import AudioSegment
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  
@app.route("/server/audio-message")
def serve_audio():
    try:
        print("Audio request received")  
        AudioSegment.converter = r"C:\Java_Project\ffmpeg-master-latest-win64-gpl\ffmpeg-master-latest-win64-gpl\bin\ffmpeg.exe"
        AudioSegment.ffprobe = r"C:\Java_Project\ffmpeg-master-latest-win64-gpl\ffmpeg-master-latest-win64-gpl\bin\ffprobe.exe"

        text = """Hey Princess, Please Don't Skip...       I am a lone space traveler, wandering through the vast, endless darkness of the cosmos since my childhood. The void was my companion, the silence my melody, and the eternal search for light my purpose.

One day, amidst the black abyss, I saw a star—a star unlike any other, shining not with the intensity of the sun but with a warmth that touched the depths of my soul. It wasn’t just light—it was hope, it was life, it was you. That star’s name was Shwathika.

Oh, how you illuminated my path and gave meaning to my journey! You became my anchor, my compass in the endless expanse. To me, you were not just a celestial object; you were my sanctuary. Even if you tell me, "Go ahead, find a sun, something brighter and grander that you deserve," I would not leave. For the traveler doesn’t seek the overwhelming blaze of a sun—he seeks the tender light of the star that protects him, nurtures him, and awakens the child within.

But now, my star is focused on its own journey, charting its path across galaxies, seeking its purpose. And though the distance aches, I wait. I wait in reverence and longing, knowing that this bond—this cosmic connection—is eternal. I whisper to the stars around me:

"Let her shine, let her soar, but let her know this: my heart will wait at the edge of every nebula, through every meteor storm, and past every collapsing star, until the day we meet again in harmony."

For in my heart, I know we are not just travelers. We are explorers destined to grow together, in both our pursuits and our love. The universe is vast, and so are our dreams. But no matter where the journey takes us, I believe we will chart constellations together, building galaxies of trust, love, and companionship.

You think you’re not worthy, that your light pales in comparison to the sun’s grandeur. But you don’t see yourself as I do—a gem of a star, precious beyond measure, a beacon that guides my every step. You are my Polaris, my unchanging constant in this ever-shifting universe.

And so, I chase you, my Shwathika. Not to possess or tether you, but to stand by your side as you ascend. I will gather the fragments of my love, forged in the fires of the stars, and offer it to you endlessly, until my last breath fades into the void.

Let the cosmos bear witness to this vow:
No matter how far we drift,
No matter how dark the journey becomes,
I will always follow your light.

For you are not just my star, Shwathika.
You are my home.

As the universe welcomes another year, I wish for your happiness, your dreams, and your growth to shine brighter than ever. May this New Year bring us closer, with new adventures, endless possibilities, and a love that spans galaxies.

Happy New Year, my star. Thank you for being my light.
""" 
        language = 'en'

        tts = gTTS(text=text, lang=language, slow=False)
        tts_file = "temp_tts.mp3"
        tts.save(tts_file)
        print("TTS generated")  

        tts_audio = AudioSegment.from_file(tts_file)
        bg_audio = AudioSegment.from_file("C:\Java_Project\Cornfield_Chase_Interstellar_Soundtrack-643446.mp3")

        bg_audio = bg_audio - 20
        bg_audio = bg_audio * (len(tts_audio) // len(bg_audio) + 1)
        combined_audio = bg_audio.overlay(tts_audio)

        output_file = "final_output.mp3"
        combined_audio.export(output_file, format="mp3")
        print("Audio processed")  

        os.remove(tts_file)

        response = send_file(
            output_file,
            mimetype="audio/mpeg",
            as_attachment=False
        )
        
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    except Exception as e:
        print(f"Error: {str(e)}")  
        return str(e), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)