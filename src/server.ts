import fastify from "fastify";
import cors from "@fastify/cors";

const server = fastify({ logger: true });

server.register(cors, {
    origin: "*",
    methods: ["GET", "POST"],
})

const heroes = [
    { id: 1, name: "Leon S. Kennedy", weapon: "handgun" },
    { id: 2, name: "Claire Redfield", weapon: "shotgun" },
    { id: 3, name: "Jill Valentine", weapon: "pistol" },
    { id: 4, name: "Chris Redfield", weapon: "submachine gun" },
    { id: 5, name: "Ada Wong", weapon: "knife" },
    { id: 6, name: "Rebecca Chambers", weapon: "first aid kit" }
]

const villains = [
    { id: 1, name: "Albert Wesker", weapon: "superhuman strength" },
    { id: 2, name: "Nemesis", weapon: "rocket launcher" },
    { id: 3, name: "William Birkin", weapon: "G-virus" },
    { id: 4, name: "Osmund Saddler", weapon: "parasite control" },
    { id: 5, name: "Mr. X", weapon: "super strength" },
    { id: 6, name: "Jack Krauser", weapon: "cybernetic enhancements" }
]

server.get("/heroes", async (request, response) => {
    response.type("application/json").code(200)

    return heroes;
});

server.get("/villains", async (request, response) => {
    response.type("application/json").code(200);

    return { villains }
})

interface HeroParams {
    id: string;
}

server.get<{ Params: HeroParams }>("/heros/:id", async (request, response) => {
    const id = parseInt(request.params.id);
    const hero = heroes.find(h => h.id === id);

    if (!hero) {
        response.type("application/json").code(404);
        return { error: "Hero not found" };

    } else {
        response.type("application/json").code(200);
        return { hero };
    }
});


interface VillainsParams {
    id: string;
}

server.get<{ Params: VillainsParams }>("/villains/:id", async (request, response) => {
    const id = parseInt(request.params.id);
    const villain = villains.find(v => v.id === id);

    if (!villain) {
        response.type("application/json").code(404);
        return { error: "Villain not found" };

    } else {
        response.type("application/json").code(200);
        return { villain };
    }
});

server.listen({ port: 3333 }, () => {
    console.log("Server is running on port 3333");
})