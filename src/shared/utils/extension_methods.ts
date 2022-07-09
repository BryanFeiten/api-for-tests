declare global {
  interface String {
    isEmpty(): boolean;
    isNotEmpty(): boolean;
  }
}

String.prototype.isEmpty = function(this): boolean {
  return this.length === 0;
}

String.prototype.isNotEmpty = function(this): boolean {
  return this.length > 0;
}

export {}