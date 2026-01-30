"use client";

import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ChatErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("AssistantChat crashed:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return null; // Don't render anything if the chat crashes
    }

    return this.props.children;
  }
}
