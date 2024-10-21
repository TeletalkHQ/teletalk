// /* eslint-disable no-console */
// import { createAdapter, setupPrimary } from "@socket.io/cluster-adapter";
// import { setupMaster, setupWorker } from "@socket.io/sticky";
// import { ip } from "address";
// import cluster from "cluster";
// import http from "http";
// import os from "os";
// import PrettyError from "pretty-error";

// PrettyError.start();

// export const runner = async () => {
// 	const { USE_CLUSTERS, LOG_ENVS } = configManager.getConfigs().APP;

// 	if (USE_CLUSTERS === "true") {
// 		runWithClusters();
// 	} else runNormal();
// };

// const runWithClusters = async () => {
// 	if (cluster.isPrimary) setupPrimaryServer();
// 	else setupWorkerServer();
// };

// const runNormal = async () => {
// 	const httpServer = createHttpServerWithListener();
// 	await createSocketServer(httpServer);
// };

// const setupPrimaryServer = () => {
// 	const httpServer = createHttpServerWithListener();

// 	setupMaster(httpServer, {
// 		loadBalancingMethod: "round-robin",
// 	});

// 	setupPrimary();

// 	cluster.setupPrimary({
// 		serialization: "advanced",
// 	});

// 	forkClusters();

// 	registerClusterOnExitEvent();
// };

// const setupWorkerServer = async () => {
// 	const httpServer = http.createServer();

// 	const io = await createSocketServer(httpServer);

// 	io.adapter(createAdapter());

// 	setupWorker(io);
// };

// const createHttpServerWithListener = () => {
// 	const httpServer = http.createServer();
// 	httpServer.listen(configManager.getConfigs().APP.PORT, httpServerListener);
// 	return httpServer;
// };

// const httpServerListener = () => {
// 	const { ENVIRONMENT, PORT } = configManager.getConfigs().APP;

// 	console.info(
// 		`Server is running. RUNTIME_MODE:${ENVIRONMENT}, PID:${
// 			process.pid
// 		}, PORT:${PORT}, ACCESS_POINT:${ip()}:${PORT}`
// 	);
// };

// const forkClusters = () => {
// 	const NUM_OF_WORKER_THREADS = os.cpus().length;
// 	for (let i = 0; i < NUM_OF_WORKER_THREADS; i++) {
// 		cluster.fork();
// 	}
// };

// const registerClusterOnExitEvent = () => {
// 	cluster.on("exit", (worker) => {
// 		console.debug(`Worker ${worker.process.pid} died`);
// 		cluster.fork();
// 	});
// };
