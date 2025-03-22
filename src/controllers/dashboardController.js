/**
 * Get dashboard content with health education articles
 * @route GET /api/dashboard
 */
const getDashboardContent = async (req, res) => {
    try {
        // You can store your image links in an array
        const healthEducationContent = [
            {
                id: 1,
                crouselImg: "https://media-hosting.imagekit.io//62c81493059048a0/Digital%20&%20Environmental%20Health.png?Expires=1837015712&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=gjEOCHClcHoDa3Hzvfcrdcy8-bmY97VBR2bB5BSwY6rRXQp~ABEQNSGon-qQfPw20paeeoEKz2r-kwn6F1SUid2DtwuhWcApzdngWPhWWVufXYLUIGZZFKkOXFY5X2SPUuEAionNuoLHyrzMK9pSuR~j~uRLnQBGGEA2Lao1aRb7m~1gbdyu8RJEg-2wOPXtsbyq-LVD2Nm4WtZE4MPIxjOBIXeWLqR0iMu9LIGfChQXC8uCsAZi8c3H6ZcBVCQ8TT0fMMwt8o9i4AWnnLjfjpClAm~phwrBncF0NmltkCAIKL7Tq6hO5kp3uln7jP7zkxaYYgrhkrrOPXN7ycQt4w__",
                imageUrl: "https://img.freepik.com/free-photo/digital-screen-with-environment-day_23-2148884835.jpg?ga=GA1.1.920190238.1742481079&semt=ais_hybrid",
                content: "Health & Technology: Smart Tech for a Healthier You! Technology is changing the way we take care of our health, making it easier and more personalized than ever. From smartwatches tracking heart rates to AI-powered apps offering instant health advice, staying healthy is now just a tap away. Virtual consultations have made seeing a doctor more convenient, saving time and effort. Mental health apps provide guided meditation and stress management, while smart medication reminders help people stay on track with their treatments. AI is also transforming healthcare by predicting risks and improving diagnoses, making treatments more effective. As innovation continues, we’re stepping into a future where healthcare is more accessible, efficient, and tailored to individual needs. With smart technology by our side, a healthier life is within reach.",
                title: "Digital & Environmental Health"
            },
            {
                id: 2,
                crouselImg: "https://media-hosting.imagekit.io//ef40f32d1c7146aa/Disease%20Prevention%20&%20Management.png?Expires=1837015787&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=N6WZapI4lqgZa3cPDGxFCTtSJdDItyJD9~esenPUoKHW-5xIi1kwd23y6qqXJy69dQJw671zCcI3suv6ahkJFtCvcdL8sISSf7oISuuKKWx-hOczXvZ~lE9r6htfCTcrhSEDic4v4E9wBnHiAiAPaanZOF2pZCKP6Crsxcb2J2le7qfSeJ3J9jQVTq4jTPj18HXlDt345c2Ko5G-26IAuoyEKarzHTPPr7YuciP8yB9cz8uj3p1r5vz8NBKibgt~LFUeA-~T2-w0TWmDTNkI4NO6~zo0ErRC~3kv6HHiTW1AQe9GgfqvxcQCHM9YtU0vN9rRY1643UnluQQMI3Oolw__",
                imageUrl: "https://i.pinimg.com/736x/dd/e7/ec/dde7ec6f3051aaca62913816ad1066ec.jpg",
                content: "Stay Healthy, Stay Ahead Your health is in your hands. Every choice you make—from what you eat to how you live—determines your well-being. Are you doing enough to protect yourself? Diseases don’t just happen; many can be prevented with the right habits. Simple actions like eating nutritious food, staying active, managing stress, and getting regular check-ups can safeguard your health. Prevention isn’t just about avoiding illness—it’s about building a stronger, healthier future. But what if illness strikes? Early detection and proper management can make all the difference. Understanding symptoms, following medical advice, and making lifestyle adjustments help keep diseases under control. Are you ready to take charge of your health? Small changes today can lead to a lifetime of well-being. Prevention is better than cure—start now!",
                title: "Disease Prevention & Management"
            },
            {
                id: 3,
                crouselImg: "https://media-hosting.imagekit.io//d436bd8d94474916/First%20Aid%20&%20Emergency%20Response.png?Expires=1837015823&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=ZSi85pMWfwsyj8ryoz8xFxMQWLxud-qowdX38BJhDFgEaTTKopvO-Xy7UexC8qgKHDsSL2T3grf0TE~ptSHBXVGrEAAhkc2wFd5lWVVUpBOvIca-TtYszQdHZL9Fh5yFpgkaKvmcYjnKQtBj8S7GIDY2xSCb2ZlpW-hNLxJvc6UapTUgCPea23gZh5wOrmfLs4Ny~VnZ8O1ZwQpK4jcYLZy0GS317LdIS3cvMhuxDBwbzIFcrnqcaL~QSKS~3AxVUeoyyjk5vFwjoFjzfPCXEXMohwzjcC8i5fte~hSbgWZ6qPWzcn4Bmb5ST83VmL8vFKoQVAQDUGcVTfMP2Q1PxA__",
                imageUrl: "https://i.pinimg.com/736x/3f/94/fc/3f94fcdc6542b3f29e57c5c44342ec6c.jpg",
                content: "Be the First to Help! Emergencies can happen anytime, anywhere. Would you know what to do? A few quick actions can mean the difference between life and death. Are you prepared to respond? From minor cuts to serious injuries, knowing first aid can save lives. Stopping bleeding, performing CPR, or treating burns are skills that everyone should have. In critical moments, acting fast and correctly can prevent further harm and provide relief until professional help arrives. Don’t wait for an emergency to learn what to do. Equip yourself with first-aid knowledge and be ready to help when it matters most. Use Healyks for quick first aid guidance—because every second counts!",
                title: "First Aid & Emergency Response"
            },
            {
                id: 4,
                crouselImg: "https://media-hosting.imagekit.io//811ed992c2ac471a/General%20Health%20Awareness.png?Expires=1837015855&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=wF72-6v9ic2cAEinpZ24eQn~t7LgENyaSCwSGYI2NOcXBe~AYnTMUiOCg~BxLhnAbSs0Dd8RSUm4y5kwyyw3hSbL5mmK2sOIbLFzXpUZLnTB2e5g3Yk8kz35RTN9FUbvHrYLNSLLSlARIDPw4WDw31hdqpxPxd7go5KVigtNg-nDb5bYIriuTJD7DaHtby7q-oo2x8h7w6~53Vvz6dMDpGhf0r5pqyyQBAmNfFLexlpH4DtZepoROrOrXB2GpgB24FqgQ-oSkkIYF0Tw7FzJzzyhuwLTSTpOScxCSwXiNUiTS3KiWvkYvD0f9ePi2tb8P-hScaQZVWlK-o~RcHwu3g__",
                imageUrl: "https://i.pinimg.com/474x/12/08/77/1208772328924a5c0e34759b326c670c.jpg",
                content: "Your Health, Your Wealth! Your health is your most valuable asset. Are you giving it the attention it deserves? Every meal you eat, every step you take, and every night of rest contributes to your well-being. Small habits today determine the quality of your life tomorrow. A balanced diet provides essential nutrients, while regular exercise strengthens your body and mind. Are you moving enough? Proper sleep restores energy, and hydration keeps your body functioning smoothly. When was the last time you drank enough water? Stress is a silent enemy—managing it through mindfulness, hobbies, or relaxation can work wonders. Preventive care is key. Routine check-ups and early detection can stop small problems from becoming big ones. Ignoring health today may lead to regret later. Wouldn’t you rather invest in your well-being now? Your body carries you through life—nurture it, respect it, and prioritize it. A healthy life is not just about living longer, but living better. Start today!",
                title: "General Health Awareness"
            },
            {
                id: 5,
                crouselImg: "https://media-hosting.imagekit.io//c975c2d31b4046b3/Heart%20Attack.png?Expires=1837015874&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=XiOf1Phe9-tAIYVZu3QBraaBEHyx3KI4HpoNJ3VQFOfKEmcuj1U3OOHkIlwaZbyk3iFVhT~UDHlERfOaUXdW8MSFQe2KSm-EWJaXcGmt6idtQmjD1mBP8EK4I~2TBEaPDmEQhv4gte~b3Evwv5tLZkNggrmasu4keWkv4Zlf4gA-jn1RHFbA6bmJLBrs9BYKnFuuigXPGouYM1jAHEqhAxgluWCudOx5RNxcC2zFLKKjv1EOp4VgnI-ezTn9A0hNemNK3T8qPYQ9QhunXlBoPlyH~zssdGz1Le2FOnAmF6j-pZmnPwLTI4tmGU5XuO01fZUGI-TesIuSGD857cwAtQ__",
                imageUrl: "https://media.istockphoto.com/id/1287603493/vector/heart-attack-warning-signs-colored-icons-set-medical-line-style-background-medicine-and.jpg?s=612x612&w=0&k=20&c=c8gXbdCOPdxP1VcqWZA60DJssdoyiH2yjZR9y8q_jck=",
                content: "Know the Signs, Save a Life! A heart attack can strike anytime, anywhere. Would you recognize the warning signs? Chest pain, shortness of breath, dizziness, and discomfort in the arms, neck, or jaw could mean a life-threatening emergency. Would you know what to do? Every second counts. If someone shows symptoms, call 112 immediately. Encourage them to stay calm, sit down, and chew an aspirin if available. Perform CPR if necessary—your quick response could make all the difference. Prevention starts today. Are you taking care of your heart? Regular exercise, a heart-healthy diet, stress management, and routine check-ups can significantly reduce the risk. Your heart beats for you—protect it. Act fast, stay informed, and be ready. You have the power to save a life!",
                title: "Heart Attack"
            },
            {
                id: 6,
                crouselImg: "https://media-hosting.imagekit.io//036628a9cf7a4fe0/Hypertension%20(High%20blood%20pressure).png?Expires=1837015895&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=O4OFw~QRQid8NbWtOeLhVoMwiSeepCPhm5DfALLA2Wdak8B-pBw6brji4AjrjSKNMU8N47g3ET6t4l54UnXunVMfs41iAIeXRIT6UEB0RzM1uJN-j2MaqvJSbhSiSuuqftKcNDa2uRLBt6~R1NpSlaYNj4c9Is28rx7kRx9pe6p2zJWnNYMK6zhzfu-rryUfHx~kjh-5Thy1AohVLx7X2QMUSq0HDsfg6E11ScV27l9-4M2TQz3Y3MJeUjOcS3wk~TSNDhW2Fwb7NImFXvlKwtBxyEB22XL6gwpR5Q3c7m5G2J4fUmWof-CJw~MWVbcMdNwPhSEhbGYIY9jBhElezw__",
                imageUrl: "https://i.pinimg.com/474x/c7/e4/9a/c7e49a4091ea40043754eac4781e3214.jpg",
                content: "Hypertension (High Blood Pressure) Control Your Blood Pressure Before It Controls You! Hypertension, or high blood pressure, occurs when the force of blood against the artery walls remains consistently high, leading to potential health risks like heart disease, stroke, and kidney failure. Often called the 'silent killer', it may not always show symptoms, but signs like persistent headaches, dizziness, blurred vision, and shortness of breath can indicate elevated blood pressure levels. Managing hypertension requires a combination of lifestyle changes and medical guidance. A diet rich in fruits, vegetables, and low in sodium helps regulate blood pressure. Regular physical activity, such as walking or yoga, improves circulation and overall heart health. Stress management techniques like deep breathing, meditation, and quality sleep also play a crucial role. Monitoring blood pressure regularly and consulting a doctor for personalized advice ensures better long-term control. Would you like to explore a self-assessment tool or receive personalized lifestyle tips to keep your blood pressure in check?",
                title: "Hypertension (High blood pressure)"
            },
            {
                id: 7,
                crouselImg: "https://media-hosting.imagekit.io//a221c30f32434cea/Mental%20health%20and%20wellbeing.png?Expires=1837015919&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=g44lVGVeUty7hq8Zjm1xas3p7SRRZf2~u4cL-h14fvuGCqkEskPH7fqHYuoXQULmhhJAyeV2a83SqDM638cTqe5FdqkM5dmM6hqkTxVqKJbpegh5BIUyWkzQiBCaKeIZrM4Rg1oN3N9vUBjJp1UVU~33hHLwoEpbVGjINBWMXWeYmJmBLehkLj2ra3yr473Qwr8jEQzGA7Qb94p5mS4pgei-fYIYneAlbYxOrsTEszFjV9Wq2vWcSKbZirMsdQNNuY54CwMLSlDQcOZgbiBamN7Qz37f6WMIZ2jBd~RLV4aFSnZu4JDMZbxBP8nHeiApvQP3qwHH~m4qxTsPBdjorA__",
                imageUrl: "https://i.pinimg.com/736x/63/b5/63/63b5633b893e947f1b516800c60ffca3.jpg",
                content: "Mental Health and Wellbeing Your mind is just as important as your body. In today’s fast-paced world, stress, anxiety, and burnout have become common, but taking care of your mental health is essential for a fulfilling life. Understanding Mental Health Mental health is not just about avoiding illness; it’s about thriving. A positive mindset, emotional resilience, and self-awareness can improve your overall well-being. How to Improve Your Mental Wellbeing? Stay Active: Exercise releases endorphins that boost mood. A short walk or yoga session can do wonders. Eat Well: A balanced diet fuels your mind and body, reducing stress and fatigue. Stay Connected: Talking to friends, family, or even professionals can help release emotional burdens. Prioritize Sleep: Rest is crucial for a refreshed mind. Aim for 7-9 hours of sleep daily. Mindfulness and Meditation: Practicing mindfulness helps reduce stress and improve focus. When to Seek Help? If feelings of sadness, stress, or anxiety persist and affect daily life, don’t hesitate to seek professional help. Therapy and counseling provide valuable guidance and support. Takeaway Your mind matters! Prioritize self-care, stay connected, and embrace a healthy lifestyle to nurture your mental well-being.",
                title: "Mental health and wellbeing"
            },
            {
                id: 8,
                crouselImg: "https://media-hosting.imagekit.io//ca4c04adcba34c10/Nutrition%20and%20Diet.png?Expires=1837015936&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=wtGY~GB54jKkYWoe8CxBvADpwixhdth1scPMztlFzzzdlh2RTwDJnV~nFQibrJhj3JJ1nhfbLXCYzqa7v6TStyNzWoa7x048hrbCd4fZDqP3zFbAMZkcmIG58AAgptFUAg3XI8ATSEl89PkYkUfRUn8Yoq2r3TOj0n3g4mZbu5zSsd-T-HlB~CC7lfH5ECgsfduqNcfmWtG-7RJm6PdSSG6eHfc79yC5Ry4482ppxaK0mZSDTb51GQ-Mrmbsz~WYwRfYE9-~R-a1qmTcFGAEJUq7GTFa1FwcR20tDvjBu3SPipvjgstScnuTdSyjYcVpWKCcTYTINLUfGYpdeT~vZw__",
                imageUrl: "https://i.pinimg.com/736x/6e/3f/70/6e3f706933b1393379d529947c37674d.jpg",
                content: "Eat Smart, Live Strong: The Power of Good Nutrition Every bite you take impacts your health, energy, and well-being. Choosing the right foods fuels your body, while poor choices can slow you down. What Makes a Meal Nutritious?A balanced plate includes:Proteins (chicken, fish, lentils) for muscle growth and repair.Whole grains (brown rice, oats, quinoa) for lasting energy. Fruits & Vegetables for vitamins, minerals, and antioxidants. Healthy fats (nuts, seeds, olive oil) for brain function and heart health. Foods to Avoid or Limit: Processed foods loaded with preservatives and artificial ingredients. Sugary snacks and drinks that cause energy crashes and weight gain. Fast food and fried items high in unhealthy fats and sodium. The Impact of Poor Nutrition Unhealthy eating habits can lead to fatigue, digestive issues, weakened immunity, and long-term risks like obesity, diabetes, and heart disease. Eating right isn’t about strict dieting—it’s about making smarter choices every day. What’s one healthy habit you want to start today?",
                title: "Nutrition and Diet"
            },
            {
                id: 9,
                crouselImg: "https://media-hosting.imagekit.io//9043be41284d4b59/Periods.png?Expires=1837015958&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=WsB629PMijFlgnYGPZfMTySDhUSdC~Btp2mOz-5eNRyimR51q7wx8WUkvXlWldzrwTnOhnsq1-uTR0sX-Xfseejka6yl~7Fk5adzS9eTP4OyypFKxlFImApitiOuDuO~InBm~3sqw6cOeYLHE9BqblmSNxmXJAHAlqU51vRlisOiESGuFOwcC~oSu0MFlWCOpjsK9x-AxQsFesRRnIcaUW8V7j52Xy3mBQvpBKZh-NRDqbMzYESk8Bmiv-7HTRoCTm~JLPGV~W0Dww2JNVnKYnkoucB8k0TA8me2PVe-dZo8GXxiNsMKvCJ4zJVMsnSZMQZ1Y75QLfvF3BGis9CFgA__",
                imageUrl: "/images/heart-health.jpghttps://i.pinimg.com/736x/d4/a0/23/d4a023628940082de7e3a0b61a12fdcc.jpg",
                content: "Menstrual Health: Know Your Cycle, Know Your BodyYour period is more than just a monthly event—it’s a reflection of your overall well-being. Understanding your cycle helps you stay in control of your health. Phases of the Menstrual Cycle Menstrual Phase (Days 1-5) – The shedding of the uterine lining. You may feel fatigued, so rest and hydration are key. Follicular Phase (Days 6-14) – Your energy levels rise as your body prepares for ovulation. This is a great time for productivity and exercise. Ovulation Phase (Day 14-16) – The most fertile phase. Some may experience mild cramps or changes in body temperature. Luteal Phase (Days 17-28) – PMS symptoms like bloating, mood swings, or cravings may appear. Prioritizing self-care can help. Tips for a Healthy Cycle Stay hydrated and eat iron-rich foods to replenish lost nutrients. Get enough sleep and manage stress to keep your hormones balanced. Engage in light exercise to ease cramps and boost mood. Track your cycle to recognize patterns and prepare for changes. Your cycle is unique to you. Listening to your body helps you navigate each phase with confidence.",
                title: "Periods"
            },
            {
                id: 10,
                crouselImg: "https://media-hosting.imagekit.io//ab57c72f9a2f4d4e/physical%20fitness%20and%20exercise.png?Expires=1837015976&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=DdZD1~aqdTLz21Ptx5OFVG2a7p0p-O4gKV0R~ek0-Icq2SA6pBgcpKPNdOBc-G6bEqwfNrO3BQwB-6vxaV8S0QfK6nrsFmgwGfE1bmdjCkCYrhoBs3mSSRLoPEdUaDmzeCqwoNehGdo~VpYrI9GEi6WAsjOJ4LVQxQ7kfF7KQDNWCz1bzQmiCOrCXP1dEGc4cuWXzdLRgbWUwYMpUkNPDYeABiSsdITHy02TaG1zLW9ejTv1oFr7odRX9fgV1rEspViYzrvwZa5ZO~1gf5IbZ81OYYOGdPBcFUtRjcHlYjQQDxJFebpOzQjzmOb9B8oQY~4z5w9VphwrvAlPh4AIFQ__",
                imageUrl: "https://i.pinimg.com/736x/02/bc/02/02bc02cfab15af1dc8e840f422dc18b5.jpg",
                content: "Physical Fitness & Exercise: Move More, Live More Exercise isn’t just about building muscle or burning calories—it’s about feeling stronger, more energized, and confident in your body. Movement improves endurance, supports mental well-being, and keeps you active in daily life. Cardio workouts like running or cycling strengthen the heart and lungs, while strength training helps build muscle and boost metabolism. Stretching and mobility exercises keep the body flexible, reducing the risk of injuries. Every movement, whether a simple walk or an intense workout, contributes to a healthier body and mind. Staying active doesn’t mean following a strict routine. It’s about finding what works for you, whether it’s lifting weights, playing a sport, or dancing to your favorite music. The key is consistency and enjoying the process. What’s one movement you love doing every day?",
                title: "physical fitness and exercise"
            },
            {
                id: 11,
                crouselImg: "https://media-hosting.imagekit.io//51950ad8bbba44cf/Sexual%20&%20Reproductive%20Health.png?Expires=1837016052&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=sRSXdhOS9NKGaSc2rjNlfFq~QFeNs5xX-Zq91VTZznQVaNQt8C8hSxa7I5MbUbyxqY8VNSbgDFViytdoAXwJYchwWPbgC110ceeiYzYbGVfoLelMv9X2NCox6tVWVqj1zijg1aG4soEA6EAcQ-79j3X-XKR73KqaP9NNcJl9Agim3US6SP8VpQSsQtUrNNQjaU5tPQEWvWv4hNmgg96Z15dVEZlNxjF0LT8nXzM1LZH4667kaE9IsSswVq8TS9k0A7VxNNtpVpEVG~nNafigfTJugd8Gz~LIie28f47R~O~2Ve70yCXMJAv1covuBgupw6-Vj9Fem1cpGqoqjdA9-w__",
                imageUrl: "https://cms.childtrends.org/wp-content/uploads/2020/10/OPA-school-strategies-graphics-pentagon1-2.png",
                content: "Sexual and Reproductive Health: Safe Choices, Healthy Future Taking care of sexual and reproductive health is essential for overall well-being. It involves making informed choices, understanding the body, and ensuring access to safe and responsible healthcare. A healthy reproductive system supports physical and emotional health, fostering confidence and control over personal decisions. Open conversations about safe practices, consent, and emotional well-being create a more supportive environment. Regular health check-ups, proper hygiene, and awareness about contraception and protection help prevent infections and complications. Understanding reproductive rights and access to healthcare ensures that everyone can make choices that align with their well-being. Sexual health isn’t just about the absence of disease—it’s about respect, safety, and empowerment. When individuals have the knowledge and resources to make informed decisions, they can lead healthier and more fulfilling lives. What does a healthy future mean to you?",
                title: "Sexual & Reproductive Health"
            },
            {
                id: 12,
                crouselImg: "https://media-hosting.imagekit.io//ada9eec8d37843d5/Substance%20Abuse%20Awareness.png?Expires=1837016073&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=WLmxiubIsZdyOnKqgf9cEgaTDJj4Vb93jR1tk12YLxg6umSWnEWvCUR5Ce5NBejtr7Hkxt748pKT1fjQMcx-zDT4dJHkCjmO~jqaCyWbAJelA~yqieKqSaVhLDn6P5-1qOt15PMqHxphMJ3jv101sveg4bqrhJ6Hmon-5BuBs8cfajCMq3RSz0HjQfN8~Sm6ZTloPFK4gkYSHNSr~jwFUohC7IBK5Siedyt-U3ALpwmCV3tmBPkzpKpz3ANq3JaFp7pZrDU2UD8J0eaoLQ5uqKGstsa5pAh-6IPhaJVvW~lid-6i8syM-v6wEpWQs~SfqZ6dTGPHtq~Q3MVEq35kXA__",
                imageUrl: "https://i.pinimg.com/736x/04/c9/b8/04c9b8e43b8d8efa708342fc3c0aa0d5.jpg",
                content: "Substance Abuse Awareness: Say No to Addiction, Say Yes to Life Imagine waking up every morning feeling energized, clear-headed, and in control of your life. Now, think about the opposite—a life where substances dictate your decisions, affect your relationships, and compromise your health. Which future do you want? Substance abuse isn’t just about addiction; it’s about losing the freedom to choose a healthy, fulfilling life. Smoking weakens your lungs, drinking damages your liver, and drug use can take a toll on your mind and body. But here’s the good news—you have the power to change the outcome. Have you ever thought about what triggers unhealthy habits? Stress, peer pressure, or just curiosity? What if, instead of reaching for a cigarette or a drink, you found a way to channel those emotions into something positive? Exercise, hobbies, and supportive friendships can replace the temporary escape of substances with lasting fulfillment. Take a moment to reflect. Who in your life depends on you? What dreams do you have for the future? Every decision you make today shapes the life you live tomorrow. If you ever feel stuck, remember—help is available. Friends, family, and professionals are ready to support you. What’s one step you can take today toward a healthier, addiction-free life?",
                title: "Substance Abuse Awareness"
            },
        ];

       
        return res.status(200).json({
            success: true,
            message:"content fetched",
            data: healthEducationContent
        });
    } catch (error) {
        console.error("Error fetching dashboard content:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch dashboard content",
            error: error.message
        });
    }
};
const getDashboardContentById = async (req, res) => {
    try {
        const contentId = parseInt(req.params.id);
        
        const healthEducationContent = [
            {
                id: 1,
                crouselImg: "https://media-hosting.imagekit.io//06bc9f5307394d46/Digital%20&%20Environmental%20Health.png?Expires=1837017049&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=fkoWTlNFzMZWjE2f589DB3Qid6c1JJmpPUgoB1mYC81-LCnv42VSpfOPAq4yMtRCxDEESOCEirgZonTs6b-px84fWo~yEEmWAmVvi9BPtDgEKskaW~vm~--D8MlGgP4aIEj3i8CwuIZ-vlC256IOgWfXy3z~-52jstPQBCsKoluu3iVmJXW8lwMMGum9lHR4pnDJOoRuZVeDMjno4V-APWFUodcX4XGkuQPreDz-2HiR3gBZel72y76L7LKYL0c2xtwlnSfpAqjbHIKqFfC1t2YIpwUfrALCEVuwgmaTbqsMIHrQAH8V86Bhxac7xNg-c75wwdbDOyNvSfUJifT0Wg__",
                imageUrl: "https://img.freepik.com/free-photo/digital-screen-with-environment-day_23-2148884835.jpg?ga=GA1.1.920190238.1742481079&semt=ais_hybrid",
                content: "Health & Technology: Smart Tech for a Healthier You! Technology is changing the way we take care of our health, making it easier and more personalized than ever. From smartwatches tracking heart rates to AI-powered apps offering instant health advice, staying healthy is now just a tap away. Virtual consultations have made seeing a doctor more convenient, saving time and effort. Mental health apps provide guided meditation and stress management, while smart medication reminders help people stay on track with their treatments. AI is also transforming healthcare by predicting risks and improving diagnoses, making treatments more effective. As innovation continues, we’re stepping into a future where healthcare is more accessible, efficient, and tailored to individual needs. With smart technology by our side, a healthier life is within reach.",
                title: "Digital & Environmental Health"
            },
            {
                id: 2,
                crouselImg: "https://media-hosting.imagekit.io//ef40f32d1c7146aa/Disease%20Prevention%20&%20Management.png?Expires=1837015787&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=N6WZapI4lqgZa3cPDGxFCTtSJdDItyJD9~esenPUoKHW-5xIi1kwd23y6qqXJy69dQJw671zCcI3suv6ahkJFtCvcdL8sISSf7oISuuKKWx-hOczXvZ~lE9r6htfCTcrhSEDic4v4E9wBnHiAiAPaanZOF2pZCKP6Crsxcb2J2le7qfSeJ3J9jQVTq4jTPj18HXlDt345c2Ko5G-26IAuoyEKarzHTPPr7YuciP8yB9cz8uj3p1r5vz8NBKibgt~LFUeA-~T2-w0TWmDTNkI4NO6~zo0ErRC~3kv6HHiTW1AQe9GgfqvxcQCHM9YtU0vN9rRY1643UnluQQMI3Oolw__",
                imageUrl: "https://i.pinimg.com/736x/dd/e7/ec/dde7ec6f3051aaca62913816ad1066ec.jpg",
                content: "Stay Healthy, Stay Ahead Your health is in your hands. Every choice you make—from what you eat to how you live—determines your well-being. Are you doing enough to protect yourself? Diseases don’t just happen; many can be prevented with the right habits. Simple actions like eating nutritious food, staying active, managing stress, and getting regular check-ups can safeguard your health. Prevention isn’t just about avoiding illness—it’s about building a stronger, healthier future. But what if illness strikes? Early detection and proper management can make all the difference. Understanding symptoms, following medical advice, and making lifestyle adjustments help keep diseases under control. Are you ready to take charge of your health? Small changes today can lead to a lifetime of well-being. Prevention is better than cure—start now!",
                title: "Disease Prevention & Management"
            },
            {
                id: 3,
                crouselImg: "https://media-hosting.imagekit.io//d436bd8d94474916/First%20Aid%20&%20Emergency%20Response.png?Expires=1837015823&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=ZSi85pMWfwsyj8ryoz8xFxMQWLxud-qowdX38BJhDFgEaTTKopvO-Xy7UexC8qgKHDsSL2T3grf0TE~ptSHBXVGrEAAhkc2wFd5lWVVUpBOvIca-TtYszQdHZL9Fh5yFpgkaKvmcYjnKQtBj8S7GIDY2xSCb2ZlpW-hNLxJvc6UapTUgCPea23gZh5wOrmfLs4Ny~VnZ8O1ZwQpK4jcYLZy0GS317LdIS3cvMhuxDBwbzIFcrnqcaL~QSKS~3AxVUeoyyjk5vFwjoFjzfPCXEXMohwzjcC8i5fte~hSbgWZ6qPWzcn4Bmb5ST83VmL8vFKoQVAQDUGcVTfMP2Q1PxA__",
                imageUrl: "https://i.pinimg.com/736x/3f/94/fc/3f94fcdc6542b3f29e57c5c44342ec6c.jpg",
                content: "Be the First to Help! Emergencies can happen anytime, anywhere. Would you know what to do? A few quick actions can mean the difference between life and death. Are you prepared to respond? From minor cuts to serious injuries, knowing first aid can save lives. Stopping bleeding, performing CPR, or treating burns are skills that everyone should have. In critical moments, acting fast and correctly can prevent further harm and provide relief until professional help arrives. Don’t wait for an emergency to learn what to do. Equip yourself with first-aid knowledge and be ready to help when it matters most. Use Healyks for quick first aid guidance—because every second counts!",
                title: "First Aid & Emergency Response"
            },
            {
                id: 4,
                crouselImg: "https://media-hosting.imagekit.io//811ed992c2ac471a/General%20Health%20Awareness.png?Expires=1837015855&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=wF72-6v9ic2cAEinpZ24eQn~t7LgENyaSCwSGYI2NOcXBe~AYnTMUiOCg~BxLhnAbSs0Dd8RSUm4y5kwyyw3hSbL5mmK2sOIbLFzXpUZLnTB2e5g3Yk8kz35RTN9FUbvHrYLNSLLSlARIDPw4WDw31hdqpxPxd7go5KVigtNg-nDb5bYIriuTJD7DaHtby7q-oo2x8h7w6~53Vvz6dMDpGhf0r5pqyyQBAmNfFLexlpH4DtZepoROrOrXB2GpgB24FqgQ-oSkkIYF0Tw7FzJzzyhuwLTSTpOScxCSwXiNUiTS3KiWvkYvD0f9ePi2tb8P-hScaQZVWlK-o~RcHwu3g__",
                imageUrl: "https://i.pinimg.com/474x/12/08/77/1208772328924a5c0e34759b326c670c.jpg",
                content: "Your Health, Your Wealth! Your health is your most valuable asset. Are you giving it the attention it deserves? Every meal you eat, every step you take, and every night of rest contributes to your well-being. Small habits today determine the quality of your life tomorrow. A balanced diet provides essential nutrients, while regular exercise strengthens your body and mind. Are you moving enough? Proper sleep restores energy, and hydration keeps your body functioning smoothly. When was the last time you drank enough water? Stress is a silent enemy—managing it through mindfulness, hobbies, or relaxation can work wonders. Preventive care is key. Routine check-ups and early detection can stop small problems from becoming big ones. Ignoring health today may lead to regret later. Wouldn’t you rather invest in your well-being now? Your body carries you through life—nurture it, respect it, and prioritize it. A healthy life is not just about living longer, but living better. Start today!",
                title: "General Health Awareness"
            },
            {
                id: 5,
                crouselImg: "https://media-hosting.imagekit.io//c975c2d31b4046b3/Heart%20Attack.png?Expires=1837015874&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=XiOf1Phe9-tAIYVZu3QBraaBEHyx3KI4HpoNJ3VQFOfKEmcuj1U3OOHkIlwaZbyk3iFVhT~UDHlERfOaUXdW8MSFQe2KSm-EWJaXcGmt6idtQmjD1mBP8EK4I~2TBEaPDmEQhv4gte~b3Evwv5tLZkNggrmasu4keWkv4Zlf4gA-jn1RHFbA6bmJLBrs9BYKnFuuigXPGouYM1jAHEqhAxgluWCudOx5RNxcC2zFLKKjv1EOp4VgnI-ezTn9A0hNemNK3T8qPYQ9QhunXlBoPlyH~zssdGz1Le2FOnAmF6j-pZmnPwLTI4tmGU5XuO01fZUGI-TesIuSGD857cwAtQ__",
                imageUrl: "https://media.istockphoto.com/id/1287603493/vector/heart-attack-warning-signs-colored-icons-set-medical-line-style-background-medicine-and.jpg?s=612x612&w=0&k=20&c=c8gXbdCOPdxP1VcqWZA60DJssdoyiH2yjZR9y8q_jck=",
                content: "Know the Signs, Save a Life! A heart attack can strike anytime, anywhere. Would you recognize the warning signs? Chest pain, shortness of breath, dizziness, and discomfort in the arms, neck, or jaw could mean a life-threatening emergency. Would you know what to do? Every second counts. If someone shows symptoms, call 112 immediately. Encourage them to stay calm, sit down, and chew an aspirin if available. Perform CPR if necessary—your quick response could make all the difference. Prevention starts today. Are you taking care of your heart? Regular exercise, a heart-healthy diet, stress management, and routine check-ups can significantly reduce the risk. Your heart beats for you—protect it. Act fast, stay informed, and be ready. You have the power to save a life!",
                title: "Heart Attack"
            },
            {
                id: 6,
                crouselImg: "https://media-hosting.imagekit.io//036628a9cf7a4fe0/Hypertension%20(High%20blood%20pressure).png?Expires=1837015895&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=O4OFw~QRQid8NbWtOeLhVoMwiSeepCPhm5DfALLA2Wdak8B-pBw6brji4AjrjSKNMU8N47g3ET6t4l54UnXunVMfs41iAIeXRIT6UEB0RzM1uJN-j2MaqvJSbhSiSuuqftKcNDa2uRLBt6~R1NpSlaYNj4c9Is28rx7kRx9pe6p2zJWnNYMK6zhzfu-rryUfHx~kjh-5Thy1AohVLx7X2QMUSq0HDsfg6E11ScV27l9-4M2TQz3Y3MJeUjOcS3wk~TSNDhW2Fwb7NImFXvlKwtBxyEB22XL6gwpR5Q3c7m5G2J4fUmWof-CJw~MWVbcMdNwPhSEhbGYIY9jBhElezw__",
                imageUrl: "https://i.pinimg.com/474x/c7/e4/9a/c7e49a4091ea40043754eac4781e3214.jpg",
                content: "Hypertension (High Blood Pressure) Control Your Blood Pressure Before It Controls You! Hypertension, or high blood pressure, occurs when the force of blood against the artery walls remains consistently high, leading to potential health risks like heart disease, stroke, and kidney failure. Often called the 'silent killer', it may not always show symptoms, but signs like persistent headaches, dizziness, blurred vision, and shortness of breath can indicate elevated blood pressure levels. Managing hypertension requires a combination of lifestyle changes and medical guidance. A diet rich in fruits, vegetables, and low in sodium helps regulate blood pressure. Regular physical activity, such as walking or yoga, improves circulation and overall heart health. Stress management techniques like deep breathing, meditation, and quality sleep also play a crucial role. Monitoring blood pressure regularly and consulting a doctor for personalized advice ensures better long-term control. Would you like to explore a self-assessment tool or receive personalized lifestyle tips to keep your blood pressure in check?",
                title: "Hypertension (High blood pressure)"
            },
            {
                id: 7,
                crouselImg: "https://media-hosting.imagekit.io//a221c30f32434cea/Mental%20health%20and%20wellbeing.png?Expires=1837015919&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=g44lVGVeUty7hq8Zjm1xas3p7SRRZf2~u4cL-h14fvuGCqkEskPH7fqHYuoXQULmhhJAyeV2a83SqDM638cTqe5FdqkM5dmM6hqkTxVqKJbpegh5BIUyWkzQiBCaKeIZrM4Rg1oN3N9vUBjJp1UVU~33hHLwoEpbVGjINBWMXWeYmJmBLehkLj2ra3yr473Qwr8jEQzGA7Qb94p5mS4pgei-fYIYneAlbYxOrsTEszFjV9Wq2vWcSKbZirMsdQNNuY54CwMLSlDQcOZgbiBamN7Qz37f6WMIZ2jBd~RLV4aFSnZu4JDMZbxBP8nHeiApvQP3qwHH~m4qxTsPBdjorA__",
                imageUrl: "https://i.pinimg.com/736x/63/b5/63/63b5633b893e947f1b516800c60ffca3.jpg",
                content: "Mental Health and Wellbeing Your mind is just as important as your body. In today’s fast-paced world, stress, anxiety, and burnout have become common, but taking care of your mental health is essential for a fulfilling life. Understanding Mental Health Mental health is not just about avoiding illness; it’s about thriving. A positive mindset, emotional resilience, and self-awareness can improve your overall well-being. How to Improve Your Mental Wellbeing? Stay Active: Exercise releases endorphins that boost mood. A short walk or yoga session can do wonders. Eat Well: A balanced diet fuels your mind and body, reducing stress and fatigue. Stay Connected: Talking to friends, family, or even professionals can help release emotional burdens. Prioritize Sleep: Rest is crucial for a refreshed mind. Aim for 7-9 hours of sleep daily. Mindfulness and Meditation: Practicing mindfulness helps reduce stress and improve focus. When to Seek Help? If feelings of sadness, stress, or anxiety persist and affect daily life, don’t hesitate to seek professional help. Therapy and counseling provide valuable guidance and support. Takeaway Your mind matters! Prioritize self-care, stay connected, and embrace a healthy lifestyle to nurture your mental well-being.",
                title: "Mental health and wellbeing"
            },
            {
                id: 8,
                crouselImg: "https://media-hosting.imagekit.io//ca4c04adcba34c10/Nutrition%20and%20Diet.png?Expires=1837015936&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=wtGY~GB54jKkYWoe8CxBvADpwixhdth1scPMztlFzzzdlh2RTwDJnV~nFQibrJhj3JJ1nhfbLXCYzqa7v6TStyNzWoa7x048hrbCd4fZDqP3zFbAMZkcmIG58AAgptFUAg3XI8ATSEl89PkYkUfRUn8Yoq2r3TOj0n3g4mZbu5zSsd-T-HlB~CC7lfH5ECgsfduqNcfmWtG-7RJm6PdSSG6eHfc79yC5Ry4482ppxaK0mZSDTb51GQ-Mrmbsz~WYwRfYE9-~R-a1qmTcFGAEJUq7GTFa1FwcR20tDvjBu3SPipvjgstScnuTdSyjYcVpWKCcTYTINLUfGYpdeT~vZw__",
                imageUrl: "https://i.pinimg.com/736x/6e/3f/70/6e3f706933b1393379d529947c37674d.jpg",
                content: "Eat Smart, Live Strong: The Power of Good Nutrition Every bite you take impacts your health, energy, and well-being. Choosing the right foods fuels your body, while poor choices can slow you down. What Makes a Meal Nutritious?A balanced plate includes:Proteins (chicken, fish, lentils) for muscle growth and repair.Whole grains (brown rice, oats, quinoa) for lasting energy. Fruits & Vegetables for vitamins, minerals, and antioxidants. Healthy fats (nuts, seeds, olive oil) for brain function and heart health. Foods to Avoid or Limit: Processed foods loaded with preservatives and artificial ingredients. Sugary snacks and drinks that cause energy crashes and weight gain. Fast food and fried items high in unhealthy fats and sodium. The Impact of Poor Nutrition Unhealthy eating habits can lead to fatigue, digestive issues, weakened immunity, and long-term risks like obesity, diabetes, and heart disease. Eating right isn’t about strict dieting—it’s about making smarter choices every day. What’s one healthy habit you want to start today?",
                title: "Nutrition and Diet"
            },
            {
                id: 9,
                crouselImg: "https://media-hosting.imagekit.io//9043be41284d4b59/Periods.png?Expires=1837015958&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=WsB629PMijFlgnYGPZfMTySDhUSdC~Btp2mOz-5eNRyimR51q7wx8WUkvXlWldzrwTnOhnsq1-uTR0sX-Xfseejka6yl~7Fk5adzS9eTP4OyypFKxlFImApitiOuDuO~InBm~3sqw6cOeYLHE9BqblmSNxmXJAHAlqU51vRlisOiESGuFOwcC~oSu0MFlWCOpjsK9x-AxQsFesRRnIcaUW8V7j52Xy3mBQvpBKZh-NRDqbMzYESk8Bmiv-7HTRoCTm~JLPGV~W0Dww2JNVnKYnkoucB8k0TA8me2PVe-dZo8GXxiNsMKvCJ4zJVMsnSZMQZ1Y75QLfvF3BGis9CFgA__",
                imageUrl: "/images/heart-health.jpghttps://i.pinimg.com/736x/d4/a0/23/d4a023628940082de7e3a0b61a12fdcc.jpg",
                content: "Menstrual Health: Know Your Cycle, Know Your BodyYour period is more than just a monthly event—it’s a reflection of your overall well-being. Understanding your cycle helps you stay in control of your health. Phases of the Menstrual Cycle Menstrual Phase (Days 1-5) – The shedding of the uterine lining. You may feel fatigued, so rest and hydration are key. Follicular Phase (Days 6-14) – Your energy levels rise as your body prepares for ovulation. This is a great time for productivity and exercise. Ovulation Phase (Day 14-16) – The most fertile phase. Some may experience mild cramps or changes in body temperature. Luteal Phase (Days 17-28) – PMS symptoms like bloating, mood swings, or cravings may appear. Prioritizing self-care can help. Tips for a Healthy Cycle Stay hydrated and eat iron-rich foods to replenish lost nutrients. Get enough sleep and manage stress to keep your hormones balanced. Engage in light exercise to ease cramps and boost mood. Track your cycle to recognize patterns and prepare for changes. Your cycle is unique to you. Listening to your body helps you navigate each phase with confidence.",
                title: "Periods"
            },
            {
                id: 10,
                crouselImg: "https://media-hosting.imagekit.io//ab57c72f9a2f4d4e/physical%20fitness%20and%20exercise.png?Expires=1837015976&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=DdZD1~aqdTLz21Ptx5OFVG2a7p0p-O4gKV0R~ek0-Icq2SA6pBgcpKPNdOBc-G6bEqwfNrO3BQwB-6vxaV8S0QfK6nrsFmgwGfE1bmdjCkCYrhoBs3mSSRLoPEdUaDmzeCqwoNehGdo~VpYrI9GEi6WAsjOJ4LVQxQ7kfF7KQDNWCz1bzQmiCOrCXP1dEGc4cuWXzdLRgbWUwYMpUkNPDYeABiSsdITHy02TaG1zLW9ejTv1oFr7odRX9fgV1rEspViYzrvwZa5ZO~1gf5IbZ81OYYOGdPBcFUtRjcHlYjQQDxJFebpOzQjzmOb9B8oQY~4z5w9VphwrvAlPh4AIFQ__",
                imageUrl: "https://i.pinimg.com/736x/02/bc/02/02bc02cfab15af1dc8e840f422dc18b5.jpg",
                content: "Physical Fitness & Exercise: Move More, Live More Exercise isn’t just about building muscle or burning calories—it’s about feeling stronger, more energized, and confident in your body. Movement improves endurance, supports mental well-being, and keeps you active in daily life. Cardio workouts like running or cycling strengthen the heart and lungs, while strength training helps build muscle and boost metabolism. Stretching and mobility exercises keep the body flexible, reducing the risk of injuries. Every movement, whether a simple walk or an intense workout, contributes to a healthier body and mind. Staying active doesn’t mean following a strict routine. It’s about finding what works for you, whether it’s lifting weights, playing a sport, or dancing to your favorite music. The key is consistency and enjoying the process. What’s one movement you love doing every day?",
                title: "physical fitness and exercise"
            },
            {
                id: 11,
                crouselImg: "https://media-hosting.imagekit.io//51950ad8bbba44cf/Sexual%20&%20Reproductive%20Health.png?Expires=1837016052&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=sRSXdhOS9NKGaSc2rjNlfFq~QFeNs5xX-Zq91VTZznQVaNQt8C8hSxa7I5MbUbyxqY8VNSbgDFViytdoAXwJYchwWPbgC110ceeiYzYbGVfoLelMv9X2NCox6tVWVqj1zijg1aG4soEA6EAcQ-79j3X-XKR73KqaP9NNcJl9Agim3US6SP8VpQSsQtUrNNQjaU5tPQEWvWv4hNmgg96Z15dVEZlNxjF0LT8nXzM1LZH4667kaE9IsSswVq8TS9k0A7VxNNtpVpEVG~nNafigfTJugd8Gz~LIie28f47R~O~2Ve70yCXMJAv1covuBgupw6-Vj9Fem1cpGqoqjdA9-w__",
                imageUrl: "https://cms.childtrends.org/wp-content/uploads/2020/10/OPA-school-strategies-graphics-pentagon1-2.png",
                content: "Sexual and Reproductive Health: Safe Choices, Healthy Future Taking care of sexual and reproductive health is essential for overall well-being. It involves making informed choices, understanding the body, and ensuring access to safe and responsible healthcare. A healthy reproductive system supports physical and emotional health, fostering confidence and control over personal decisions. Open conversations about safe practices, consent, and emotional well-being create a more supportive environment. Regular health check-ups, proper hygiene, and awareness about contraception and protection help prevent infections and complications. Understanding reproductive rights and access to healthcare ensures that everyone can make choices that align with their well-being. Sexual health isn’t just about the absence of disease—it’s about respect, safety, and empowerment. When individuals have the knowledge and resources to make informed decisions, they can lead healthier and more fulfilling lives. What does a healthy future mean to you?",
                title: "Sexual & Reproductive Health"
            },
            {
                id: 12,
                crouselImg: "https://media-hosting.imagekit.io//ada9eec8d37843d5/Substance%20Abuse%20Awareness.png?Expires=1837016073&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=WLmxiubIsZdyOnKqgf9cEgaTDJj4Vb93jR1tk12YLxg6umSWnEWvCUR5Ce5NBejtr7Hkxt748pKT1fjQMcx-zDT4dJHkCjmO~jqaCyWbAJelA~yqieKqSaVhLDn6P5-1qOt15PMqHxphMJ3jv101sveg4bqrhJ6Hmon-5BuBs8cfajCMq3RSz0HjQfN8~Sm6ZTloPFK4gkYSHNSr~jwFUohC7IBK5Siedyt-U3ALpwmCV3tmBPkzpKpz3ANq3JaFp7pZrDU2UD8J0eaoLQ5uqKGstsa5pAh-6IPhaJVvW~lid-6i8syM-v6wEpWQs~SfqZ6dTGPHtq~Q3MVEq35kXA__",
                imageUrl: "https://i.pinimg.com/736x/04/c9/b8/04c9b8e43b8d8efa708342fc3c0aa0d5.jpg",
                content: "Substance Abuse Awareness: Say No to Addiction, Say Yes to Life Imagine waking up every morning feeling energized, clear-headed, and in control of your life. Now, think about the opposite—a life where substances dictate your decisions, affect your relationships, and compromise your health. Which future do you want? Substance abuse isn’t just about addiction; it’s about losing the freedom to choose a healthy, fulfilling life. Smoking weakens your lungs, drinking damages your liver, and drug use can take a toll on your mind and body. But here’s the good news—you have the power to change the outcome. Have you ever thought about what triggers unhealthy habits? Stress, peer pressure, or just curiosity? What if, instead of reaching for a cigarette or a drink, you found a way to channel those emotions into something positive? Exercise, hobbies, and supportive friendships can replace the temporary escape of substances with lasting fulfillment. Take a moment to reflect. Who in your life depends on you? What dreams do you have for the future? Every decision you make today shapes the life you live tomorrow. If you ever feel stuck, remember—help is available. Friends, family, and professionals are ready to support you. What’s one step you can take today toward a healthier, addiction-free life?",
                title: "Substance Abuse Awareness"
            },
        ];

        const contentItem = healthEducationContent.find(item => item.id === contentId);
        
        if (!contentItem) {
            return res.status(404).json({
                success: false,
                message: `Content with ID ${contentId} not found`
            });
        }
        
        return res.status(200).json({
            success: true,
            message: "Content fetched successfully",
            data: contentItem
        });
    } catch (error) {
        console.error("Error fetching content by ID:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch content by ID",
        });
    }
};

module.exports = { getDashboardContent, getDashboardContentById };