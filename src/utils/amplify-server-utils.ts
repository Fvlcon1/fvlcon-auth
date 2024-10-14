import { authConfig } from "@/app/amplify-cognito-confg";
import { createServerRunner } from "@aws-amplify/adapter-nextjs";


export const { runWithAmplifyServerContext } = createServerRunner({
    config: {
        Auth: authConfig,
    },
});
