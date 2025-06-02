"use client";

import { getAuth } from "firebase/auth";
import { app } from "../../firebaseConfig"; // <-- dit is de juiste relatieve import

export const auth = getAuth(app);
