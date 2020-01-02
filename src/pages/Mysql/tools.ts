// mysql cron表达式拆解

export function showBackupStrategy(backupStrategy) {
    return backupStrategy
			.replace(/\*/g, "")
			.split(" ")
			.filter(i => i)
			.map((item, idx) => item);
}