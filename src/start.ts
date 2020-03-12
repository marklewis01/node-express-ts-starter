import server from "@server";
import { logger } from "@shared";

// Start the server
const port = Number(process.env.PORT || 4000);
server.listen(port, () => {
  logger.info("Server started on port: " + port);
});
