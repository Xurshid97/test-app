exports.httpHandler = {
  endpoints: [
    {
      scope: "global",
      method: "GET",
      path: "flag",
      handle: async function (ctx) {
        
        const flag = ctx.globalStorage.extensionProperties.testFlag || false;
        ctx.response.json({ flag: flag });
      },
    },
    {
      scope: "global",
      method: "POST",
      path: "flag",
      handle: async function (ctx) {
        const body = await ctx.request.json();
        const newFlag = body.flag;

        if (typeof newFlag !== "boolean") {
          ctx.response.status(400).json({
            error: `Invalid flag value, body: ${JSON.stringify(
              body
            )}, newFlag: ${newFlag}`,
          });
          return;
        }

        ctx.globalStorage.extensionProperties.testFlag = newFlag;
        ctx.response.json({ flag: newFlag });
      },
    },
  ],
};
