{ pkgs }: {
	deps = with pkgs; [
		pkgs.deno
        vscode-extensions.denoland.vscode-deno
	];
}