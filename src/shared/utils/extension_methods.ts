declare global {
  interface Date {
    toAppDate(): string;
  }

  interface String {
    isEmpty(): boolean;
    isNotEmpty(): boolean;
  }
}

Date.prototype.toAppDate = function(this): string {
  const seconds = this.getUTCSeconds() < 10 ? '0' + this.getUTCSeconds() : this.getUTCSeconds();
  const minutes = this.getUTCMinutes() < 10 ? '0' + this.getUTCMinutes() : this.getUTCMinutes();
  const hour = this.getUTCHours() < 10 ? '0' + this.getUTCHours() : this.getUTCHours();
  const day = this.getUTCDate() < 10 ? '0' + this.getUTCDate() : this.getUTCDate();
  const month = this.getUTCMonth() < 10 ? '0' + this.getUTCMonth() : this.getUTCMonth();
  const year = this.getUTCFullYear() < 10 ? '0' + this.getUTCFullYear() : this.getUTCFullYear();

  const dateFormat = `${year}/${month}/${day} ${hour}:${minutes}:${seconds}`;

  return dateFormat;
}

String.prototype.isEmpty = function(this): boolean {
  return this.length === 0;
}

String.prototype.isNotEmpty = function(this): boolean {
  return this.length > 0;
}

export {}