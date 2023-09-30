
# Bosch Collision Prevention




## Features

My solution for the first and the second part of the challenge consists of several steps:
- I filtered out the data where the numbers spoke for themselves that something was not right.
- I calculated the vechiles brake distance, which I then used to  calibrate how many data points I should predict in the next part, for it to be safe.
- I used the objects and the vechiles data, such as their positions, velocities and the yaw rate to calculate their future paths using simple trigonometry.
- I compared all of these possible future positions and searched for a match, which means a future collision.
- I chose the object which collides in the future with the car to be the relevant object.
- For the decision between scenarios, I calculated the angle between the object's and the car's velocity vector, and also examined the yaw rate to keep track of whether the car is turning or not.

For the third part of the challenge, I applied some basic AEB system.
- When predicting the collision, the car releases a horn sound to try to alarm the pedestrian.
- After the collision prediction, the software measures the distance between the current position and the supposed collision position, and if it's less than the breaking distance, the car can safely stop and nobody gets hurt.
- And because the dimension of the prediction is adjusted to the breaking distance, whenever the car detects a dangerous object, it will always have time to stop.

Some other convenient features:
- You can start, stop and repeat the simulation
- You can change the simulations speed
## Run Locally

Clone the project

```bash
  git clone https://github.com/TkcsHnr/bosch
```

Go to the project directory

```bash
  cd bosch
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## CSV dataset selection

To run this project with the correct dataset, you will need to change the `githubCsvUrl` to the corrent path in `+page.server.js`. 


## Optimizations

Please note that there is a bug which I had no time to eliminate, so when testing, try not to refresh the page because sometimes the data is lost. If it happens though, just restart the server and it should be fine.


## Tech Stack

**Client:** Svelte, TailwindCSS, DaisyUI, three.js, Threlte

**Server:** Node, SvelteKit

