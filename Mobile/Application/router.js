import { createSwitchNavigator } from 'react-navigation';
import { logedUser, isSkiped } from "./auth";

// from components
import Welcome    from "./components/Welcome";
import LogedIn    from "./components/LogedIn";

export const createRootNavigator = (inSide = false) => {
    return createSwitchNavigator(
        {
            Welcome: {
                screen: Welcome
            },
            Logedin: {
                screen: LogedIn
            }
        },
        {
            initialRouteName: inSide ? "Logedin" : "Welcome"
        }
    );
};