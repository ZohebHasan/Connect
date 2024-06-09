import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Chirp {
    id: string;
    textBody: string;
    likes: number;
    comments: number;
}

interface ChirpContextProps {
    chirps: Chirp[];
    addChirp: (chirp: Chirp) => void;
    updateChirp: (id: string, updatedChirp: Partial<Chirp>) => void;
}

interface ChirpProviderProps {
    children: ReactNode;
}

const ChirpContext = createContext<ChirpContextProps | undefined>(undefined);

export const ChirpProvider: React.FC<ChirpProviderProps> = ({ children }) => {
    const [chirps, setChirps] = useState<Chirp[]>([
        {
            id: '1',
            textBody: "The ongoing conflict in Palestine has led to immense suffering. Israeli forces have been accused of ``torturing`` Palestinians, causing widespread pain and injustice. It's crucial for the international community to stand together and advocate for ``human rights`` and peace. #JusticeForPalestine",
            likes: 120,
            comments: 15,
        },
        {
            id: '2',
            textBody: "Climate change is an urgent issue that requires immediate action. The world must come together to reduce emissions and protect our planet for future generations. #ClimateActionNow",
            likes: 250,
            comments: 30,
        },
        {
            id: '3',
            textBody: "Mental health awareness is essential. Let's break the stigma and support those struggling with ``depression`` and ``anxiety``. #MentalHealthMatters",
            likes: 180,
            comments: 25,
        },
        {
            id: '4',
            textBody: "Education is the key to a brighter future. We must ensure that every child has access to quality education regardless of their background. #EducationForAll",
            likes: 300,
            comments: 40,
        },
        {
            id: '5',
            textBody: "Technological advancements have the potential to revolutionize healthcare. We must invest in ``innovation`` to improve patient outcomes. #HealthcareInnovation",
            likes: 200,
            comments: 22,
        },
        {
            id: '6',
            textBody: "Wildlife conservation is critical to maintaining biodiversity. Let's protect endangered species and their habitats. #SaveWildlife",
            likes: 270,
            comments: 35,
        },
    ]);

    const addChirp = (chirp: Chirp) => {
        setChirps((prevChirps) => [...prevChirps, chirp]);
    };

    const updateChirp = (id: string, updatedChirp: Partial<Chirp>) => {
        setChirps((prevChirps) =>
            prevChirps.map((chirp) => (chirp.id === id ? { ...chirp, ...updatedChirp } : chirp))
        );
    };

    return (
        <ChirpContext.Provider
            value={{ chirps, addChirp, updateChirp }}
        >
            {children}
        </ChirpContext.Provider>
    );
};

export const useChirpContext = (): ChirpContextProps => {
    const context = useContext(ChirpContext);
    if (!context) {
        throw new Error('useChirpContext must be used within a ChirpProvider');
    }
    return context;
};
